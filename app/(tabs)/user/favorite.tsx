import SafeAreaView from "@/components/SafeAreaView";
import { useFavorite } from "@/contexts/favorite.context";
import { Movie } from "@/types/types";
import { useCallback, useEffect, useState } from "react";

import ListItem from "@/components/ListItem";

export default function Index() {
  const { favorites } = useFavorite();
  const [moviesResults, setMoviesResults] = useState<Movie[]>(favorites);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const onPressSearch = useCallback(async () => {
    setLoading(true);
    const m = favorites.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setMoviesResults(m);
    setLoading(false);
  }, [favorites, searchQuery]);

  useEffect(() => {
    setLoading(true);
    setMoviesResults(favorites);
    setLoading(false);
  }, [favorites]);

  const onEndReached = useCallback(async () => {}, []);

  const onPressClear = useCallback(async () => {
    setLoading(true);
    setMoviesResults(favorites);
    setLoading(false);
  }, [favorites]);

  return (
    <SafeAreaView>
      <ListItem moviesResults={moviesResults} onEndReached={onEndReached} isLoading={loading} />
    </SafeAreaView>
  );
}
