import { useServer } from "@/contexts/server.context";
import { Movie } from "@/types/types";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import { SafeAreaView } from "react-native-safe-area-context";

import ListItem from "@/components/ListItem";
import CustomTextInput from "@/components/TextInput";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default function Index() {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [moviesResults, setMoviesResults] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { searchMovies, getMovies } = useServer();

  const onPressSearch = useCallback(async () => {
    setLoading(true);
    const m = await searchMovies(searchQuery, "1");
    setMoviesResults(m.results);
    setTotalPage(m.total_pages);
    setLoading(false);
  }, [searchQuery, searchMovies]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const m = await getMovies("1");
      setMoviesResults(m?.results);
      setTotalPage(m?.total_pages);
      setLoading(false);
    })();
  }, [getMovies]);

  const onEndReached = useCallback(async () => {
    setLoading(true);
    if (page < totalPage) {
      if (searchQuery) {
        const movies = await searchMovies(searchQuery, `${page + 1}`);
        setMoviesResults((prev) => [...prev, ...movies.results]);
      } else {
        const movies = await getMovies(`${page + 1}`);
        setMoviesResults((prev) => [...prev, ...movies.results]);
      }
      setPage((prev) => prev + 1);
    }
    setLoading(false);
  }, [page, totalPage, searchQuery, searchMovies, getMovies]);

  const onPressClear = useCallback(async () => {
    setLoading(true);
    setSearchQuery("");
    const m = await getMovies("1");
    setMoviesResults(m.results);
    setTotalPage(m.total_pages);
    setLoading(false);
  }, [getMovies]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomTextInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onPressSearch={onPressSearch}
          onPressClear={onPressClear}
        />
      ),
    });
  }, [navigation, onPressSearch, onPressClear, searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <SystemBars style={"auto"} />
      <ListItem isLoading={loading} moviesResults={moviesResults} onEndReached={onEndReached} />
    </SafeAreaView>
  );
}
