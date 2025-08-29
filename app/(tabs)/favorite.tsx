import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { useFavorite } from "@/contexts/favorite.context";
import { Movie } from "@/types/types";

import ListItem from "@/components/ListItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default function Index() {
  const { favorites } = useFavorite();
  const [moviesResults, setMoviesResults] = useState<Movie[]>(favorites);

  const onPressSearch = useCallback(
    async (searchQuery: string) => {
      const m = favorites.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setMoviesResults(m);
    },
    [favorites],
  );

  useEffect(() => {
    setMoviesResults(favorites);
  }, [favorites]);

  const onEndReached = useCallback(async (searchQuery: string) => {}, []);

  const onPressClear = useCallback(async () => {
    setMoviesResults(favorites);
  }, [favorites]);

  return (
    <View style={styles.container}>
      <ListItem
        onPressSearch={onPressSearch}
        onPressClear={onPressClear}
        moviesResults={moviesResults}
        onEndReached={onEndReached}
      />
    </View>
  );
}
