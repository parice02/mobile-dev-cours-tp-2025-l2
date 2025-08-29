import { useCallback, useEffect, useState } from "react";

import { getMovies, searchMovies } from "@/data/tools";
import { Movie } from "@/types/types";
import { StyleSheet, View } from "react-native";

import ListItem from "@/components/ListItem";

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

  const onPressSearch = useCallback(async (searchQuery: string) => {
    const m = await searchMovies(searchQuery, 1);
    setMoviesResults(m.results);
    setTotalPage(m.total_pages);
  }, []);

  useEffect(() => {
    (async () => {
      const m = await getMovies(1);
      setMoviesResults(m?.results);
      setTotalPage(m?.total_pages);
    })();
  }, []);

  const onEndReached = useCallback(
    async (searchQuery: string) => {
      if (page < totalPage) {
        if (searchQuery) {
          const movies = await searchMovies(searchQuery, page);
          setMoviesResults((prev) => [...prev, ...movies.results]);
        } else {
          const movies = await getMovies(page + 1);
          setMoviesResults((prev) => [...prev, ...movies.results]);
        }
        setPage((prev) => prev + 1);
      }
    },
    [page, totalPage],
  );

  const onPressClear = async () => {
    const m = await getMovies(1);
    setMoviesResults(m.results);
    setTotalPage(m.total_pages);
  };

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
