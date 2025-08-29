import { Movie, MovieDetail, Movies } from "@/types/types";

const token = process.env.EXPO_PUBLIC_TOKEN || "";
const list_url = "https://api.themoviedb.org/3/movie/popular?language=fr-FR";
const detail_url = "https://api.themoviedb.org/3/movie/movie_id?language=en-US";
const search_url = "https://api.themoviedb.org/3/search/movie?language=fr-FR&include_adult=true";

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

export { getMovieDetail, getMovies, searchMovies };
