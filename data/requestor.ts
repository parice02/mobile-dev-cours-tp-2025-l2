import { Header, MovieDetail, Movies, QueryParameter, User } from "@/types/types";
import * as Application from "expo-application";
import { getLocales } from "expo-localization";

const locale = getLocales().at(0)?.languageCode || "fr-FR";
const SERVER_ENDPOINT = process.env.EXPO_PUBLIC_SERVER_ENDPOINT || "";
const TOKEN = process.env.EXPO_PUBLIC_TOKEN || "";
const DEFAULT_TIMEOUT = 10_000; // millisecondes

class ServerException<T = any> extends Error {
  public readonly code: number;
  public readonly response?: T;

  constructor(message: string, response?: T, code = 0) {
    super(message);

    this.name = "ServerException";
    this.code = code;
    this.response = response;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerException);
    }
  }
}

class BaseClient {
  private baseUrl: string = SERVER_ENDPOINT;
  private defaultHeaders = {
    "User-Agent": `${Application.applicationName} (${Application.nativeApplicationVersion})`,
    "Accept-Language": "fr;q=1.0,en;q=0.5",
    "Content-Type": "application/json",
  };

  private buildHeaders(customHeaders: Record<string, string> = {}, addToken = false): Headers {
    const headers = new Headers({ ...this.defaultHeaders, ...customHeaders });

    if (addToken) {
      headers.set("Authorization", `Bearer ${TOKEN}`);
    } else {
      headers.delete("Authorization");
    }

    return headers;
  }

  async call(
    method: "get" | "post" | "put" | "patch" | "delete",
    endpoint: string,
    headers: Record<string, string> = {},
    params: Record<string, any> = {},
  ): Promise<Response | ServerException> {
    const url = new URL(endpoint, this.baseUrl);
    const addToken = "token" in params;
    if (addToken) delete params.token;

    const mergedHeaders = this.buildHeaders(headers, addToken);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

    const requestInit: RequestInit = {
      method: method.toUpperCase(),
      headers: mergedHeaders,
      mode: "same-origin",
      credentials: "same-origin",
      cache: "no-cache",
      signal: controller.signal,
    };

    if (method === "get") {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    } else if (["post", "patch", "put"].includes(method)) {
      const contentType = mergedHeaders.get("Content-Type");

      if (contentType === "application/json") {
        requestInit.body = JSON.stringify(params);
      } else if (contentType === "multipart/form-data") {
        const formData = new FormData();

        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => formData.append(`${key}[]`, v));
          } else {
            formData.append(key, value);
          }
        });

        requestInit.body = formData;
        mergedHeaders.delete("Content-Type");
      }
    }

    console.log("request sent", url.toString());
    try {
      const response = await fetch(url, requestInit);
      clearTimeout(timeoutId);

      if (!response.ok) {
        const isJson = response.headers.get("content-type")?.includes("application/json");
        const data = isJson ? await response.json() : { message: await response.text() };

        let message = Object.entries(data)
          .map(([key, value]) =>
            Array.isArray(value)
              ? value.map((v) => `${key}: ${String(v)}`).join("\n")
              : String(value),
          )
          .join("\n");

        throw new ServerException(message.trim(), response, response.status);
      }

      return response;
    } catch (e: any) {
      clearTimeout(timeoutId);
      if (e instanceof ServerException) return e;
      return new ServerException(e.message, e.response, e.code);
    }
  }
}

class Client extends BaseClient {
  async get(endpoint: string, params: QueryParameter = {}, headers: Header = {}) {
    return await this.call("get", endpoint, headers, params);
  }

  async post(endpoint: string, params: QueryParameter = {}, headers: Header = {}) {
    return await this.call("post", endpoint, headers, params);
  }

  async patch(endpoint: string, params: QueryParameter = {}, headers: Header = {}) {
    return await this.call("patch", endpoint, headers, params);
  }

  async put(endpoint: string, params: QueryParameter = {}, headers: Header = {}) {
    return await this.call("put", endpoint, headers, params);
  }

  async delete(endpoint: string, params: QueryParameter = {}, headers: Header = {}) {
    return await this.call("delete", endpoint, headers, params);
  }
}

const endpoints = {
  get_movies: `discover/movie?language=${locale}&include_adult=true&include_video=true&sort_by=popularity.desc`,
  search_movies: `search/movie?language=${locale}&include_adult=true`,
  movie_detail: `movie/movie_id?language=${locale}`,
  account_info: "account/0",
};

class AppClientService {
  private client = new Client();

  private async request<T>(endpoint: string, params: Record<string, any>, fallback: T): Promise<T> {
    try {
      const response = await this.client.get(endpoint, { ...params, token: "true" });

      if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
        return (await response.json()) as T;
      }

      console.error("Request failed:", response.status, response.statusText);
      return fallback;
    } catch (error) {
      console.error("Network error:", error);
      return fallback;
    }
  }

  async get_movies(page: string): Promise<Movies> {
    return this.request<Movies>(
      endpoints.get_movies,
      { page },
      {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
      },
    );
  }

  async search_movies(query: string, page: string): Promise<Movies> {
    return this.request<Movies>(
      endpoints.search_movies,
      { query, page },
      {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
      },
    );
  }

  async movie_detail(movie: string): Promise<MovieDetail> {
    return this.request<MovieDetail>(
      endpoints.movie_detail.replace("movie_id", movie),
      {},
      {
        id: 0,
        title: "",
        genres: [],
        release_date: "",
        overview: "",
        poster_path: "",
        backdrop_path: "",
        vote_average: 0,
        vote_count: 0,
        runtime: 0,
        status: "",
        tagline: "",
        original_language: "",
        original_title: "",
        popularity: 0,
        adult: false,
        video: false,
        budget: 0,
        revenue: 0,
        homepage: "",
        imdb_id: "",
        production_companies: [],
        production_countries: [],
        spoken_languages: [],
        belongs_to_collection: null,
        origin_country: [],
      },
    );
  }

  async account_info(): Promise<User> {
    return this.request<User>(
      endpoints.account_info,
      {},
      {
        id: 0,
        username: "",
        avatar: {
          tmdb: { avatar_path: "" },
          gravatar: { hash: "" },
        },
        name: "",
        iso_639_1: "",
        iso_3166_1: "",
        include_adult: false,
      },
    );
  }
}

export default AppClientService;
export { ServerException };
