export interface Genre {
  id: number;
  name: string;
}

export interface Header {
  [key: string]: string;
}

export interface QueryParameter {
  [key: string]: string;
}

export interface Request {
  [key: string]: string | AbortSignal | Headers | FormData;
}

export interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
  release_date: string;
  overview: string;
  poster_path: string;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Company {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
}

export interface Language {
  iso_639_1: string;
  name: string;
  english_name: string;
}

export interface Country {
  iso_3166_1: string;
  name: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  genres: Genre[];
  release_date: string;
  overview: string;
  poster_path: string;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_average: number;
  vote_count: number;
  belongs_to_collection: any;
  budget: number;
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  production_companies: Company[];
  production_countries: Country[];
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
}

export interface Movies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface User {
  id: number;
  username: string;
  avatar: {
    tmdb: {
      avatar_path: string;
    };
    gravatar: {
      hash: string;
    };
  };
  name: string;
  iso_639_1: string;
  iso_3166_1: string;
  include_adult: boolean;
}

export type RequestResponse = Movies | MovieDetail | User;
