import { Movie } from "@/types/types";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useMMKVObject } from "react-native-mmkv";

const FavoriteContext = createContext({
  favorites: [] as Movie[],
  addFavorite: (movie: Movie) => {},
  removeFavorite: (movie: Movie) => {},
});

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites = [], setFavorites] = useMMKVObject<Movie[]>("favorites");

  const addFavorite = useCallback(
    (movie: Movie) => {
      if (favorites.length === 0) {
        setFavorites([movie]);
      } else {
        if (!favorites.find((m) => m.id === movie.id)) {
          setFavorites([...favorites, movie]);
        }
      }
    },
    [favorites, setFavorites],
  );

  const removeFavorite = useCallback(
    (movie: Movie) => {
      if (!(favorites.length === 0)) {
        if (favorites.find((m) => m.id === movie.id)) {
          favorites.filter((m) => m.id !== movie.id);
          setFavorites(favorites);
        }
      }
    },
    [favorites, setFavorites],
  );

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
    }),
    [favorites, addFavorite, removeFavorite],
  );

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};
