import { Movie, MovieDetail, Movies, User } from "@/types/types";
import { getLocales } from "expo-localization";

const locale = getLocales().at(0)?.languageCode || "fr-FR";
const token = process.env.EXPO_PUBLIC_TOKEN || "";
const list_url = `https://api.themoviedb.org/3/discover/movie?language=${locale}&include_adult=true&include_video=true&sort_by=popularity.desc`;
const detail_url = `https://api.themoviedb.org/3/movie/movie_id?language=${locale}`;
const search_url = `https://api.themoviedb.org/3/search/movie?language=${locale}&include_adult=true`;
const account_url = "https://api.themoviedb.org/3/account/0";

export const favoriteMovies: Movie[] = [];

const config = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const getMovies = async (page: number): Promise<Movies> => {
  try {
    const response = await fetch(list_url + `&page=${page}`, config);
    return await response.json();
  } catch (e) {
    console.error(e);
    return { page: 0, results: [], total_pages: 0, total_results: 0 };
  }
};

const getMovieDetail = async (id: string): Promise<MovieDetail> => {
  try {
    const response = await fetch(`${detail_url.replace("movie_id", id)}`, config);
    return await response.json();
  } catch (e) {
    console.error(e);
    return {
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
    };
  }
};

const searchMovies = async (query: string, page: number): Promise<Movies> => {
  try {
    const response = await fetch(`${search_url}&query=${query}&page=${page}`, config);
    return await response.json();
  } catch (e) {
    console.error(e);
    return { page: 0, results: [], total_pages: 0, total_results: 0 };
  }
};

const getUser = async (): Promise<User> => {
  try {
    const response = await fetch(account_url, config);
    return await response.json();
  } catch (e) {
    console.error(e);
    return {
      id: 0,
      username: "",
      avatar: {
        tmdb: {
          avatar_path: "",
        },
        gravatar: {
          hash: "",
        },
      },
      name: "",
      iso_639_1: "",
      iso_3166_1: "",
      include_adult: false,
    };
  }
};

export { getMovieDetail, getMovies, getUser, searchMovies };
