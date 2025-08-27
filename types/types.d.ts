export interface Genre {
  id: number;
  name: string;
}

export interface Genres {
  [key: number]: Genre;
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

export interface Movies {
  [key: number]: Movie;
}
