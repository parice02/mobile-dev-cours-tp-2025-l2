import AppClientService from "@/server";
import { createContext, ReactElement, useCallback, useContext, useMemo } from "react";

const client = new AppClientService();

const ServerContext = createContext({
  getMovies: async (page: string): Promise<any> => {},
  getMovieDetail: async (movie: string): Promise<any> => {},
  searchMovies: async (query: string, page: string): Promise<any> => {},
  getAccountInfo: async (): Promise<any> => {},
});
ServerContext.displayName = "server context";

const ServerProvider = ({ children }: { children: ReactElement }) => {
  const getMovies = useCallback(async (page: string) => {
    return await client.get_movies(page);
  }, []);
  const getMovieDetail = useCallback(async (movie: string) => {
    return await client.movie_detail(movie);
  }, []);
  const searchMovies = useCallback(async (query: string, page: string) => {
    return await client.search_movies(query, page);
  }, []);
  const getAccountInfo = useCallback(async () => {
    return await client.account_info();
  }, []);

  const value = useMemo(
    () => ({ getMovies, getMovieDetail, searchMovies, getAccountInfo }),
    [getMovies, getMovieDetail, searchMovies, getAccountInfo],
  );

  return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>;
};

function useServer() {
  return useContext(ServerContext);
}

export { ServerProvider, useServer };
