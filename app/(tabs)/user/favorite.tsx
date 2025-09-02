import { useFavorite } from "@/contexts/favorite.context";
import { Movie } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={styles.container}>
      <SystemBars style={"auto"} />
      <ListItem moviesResults={moviesResults} onEndReached={onEndReached} isLoading={loading} />
    </SafeAreaView>
  );
}
