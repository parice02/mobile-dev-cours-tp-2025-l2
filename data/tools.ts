const token = process.env.EXPO_PUBLIC_TOKEN || "";

const list_url = "https://api.themoviedb.org/3/movie/popular?language=fr-FR";

const detail_url = "https://api.themoviedb.org/3/movie/1022789?language=en-US";

const search_url = "https://api.themoviedb.org/3/search/movie?language=fr-FR";

const config = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const getMovies = async (page: number) => {
  try {
    const response = await fetch(list_url + `&page=${page}`, config);
    return await response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
};

const searchMovies = async (query: string, page: number) => {
  try {
    const response = await fetch(`${search_url}&query=${query}&page=${page}`, config);
    return await response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export { getMovies, searchMovies };
