import { Movie } from "@/types/types";
import { createContext, useCallback, useContext, useMemo, useReducer } from "react";

const FavoriteContext = createContext({
  favorites: [] as Movie[],
  addFavorite: (movie: Movie) => {},
  removeFavorite: (movie: Movie) => {},
});

export const reducer = (state: Movie[], action: { type: string; payload: Movie }) => {
  switch (action.type) {
    case "ADD_FAVORITE_MOVIES":
      return [...state, action.payload];
    case "REMOVE_FAVORITE_MOVIES":
      return state.filter((movie) => movie.id !== action.payload.id);
    default:
      return state;
  }
};

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, dispatch] = useReducer(reducer, []);

  const addFavorite = useCallback(
    (movie: Movie) => {
      if (!favorites.find((m) => m.id === movie.id)) {
        dispatch({ type: "ADD_FAVORITE_MOVIES", payload: movie });
      }
    },
    [favorites],
  );

  const removeFavorite = useCallback(
    (movie: Movie) => {
      if (favorites.find((m) => m.id === movie.id)) {
        dispatch({ type: "REMOVE_FAVORITE_MOVIES", payload: movie });
      }
    },
    [favorites],
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
