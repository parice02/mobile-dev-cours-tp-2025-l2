import { Link } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, View, VirtualizedList } from "react-native";

import EmptyComponent from "@/components/EmptyComponent";
import Item from "@/components/Item";
import ItemSeparator from "@/components/ItemSeparator";
import CustomTextInput from "@/components/TextInput";
import { Movie } from "../types/types";

import { getMovies, searchMovies } from "@/data/tools";

export default function ListItem() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [moviesResults, setMoviesResults] = useState<Movie[]>([]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <Link href={{ pathname: "./[id]", params: { id: item.id } }} asChild>
        <Pressable>
          <Item item={item} />
        </Pressable>
      </Link>
    ),
    [],
  );
  const itemSeparator = useCallback(() => <ItemSeparator />, []);

  const onPressSearch = useCallback(async () => {
    setLoading(true);
    const m = await searchMovies(searchQuery, 1);
    setMoviesResults(m.results);
    setTotalPage(m.total_pages);
    setLoading(false);
  }, [searchQuery]);

  useEffect(() => {
    (async () => {
      const m = await getMovies(1);
      setMoviesResults(m?.results);
      setTotalPage(m?.total_pages);
      setLoading(false);
    })();
  }, []);

  const onEndReached = useCallback(async () => {
    setLoading(true);
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
    setLoading(false);
  }, [page, searchQuery, totalPage]);

  const getItem = useCallback((data: any, index: number) => data[index], []);
  const keyExtractor = useCallback((item: any) => `${item.id}`, []);
  const getItemCount = useCallback((data: any) => data.length, []);

  const onPressClear = async () => {
    setLoading(true);
    setSearchQuery("");
    const m = await getMovies(1);
    setMoviesResults(m.results);
    setTotalPage(m.total_pages);
    setLoading(false);
  };

  const onRefresh = async () => {};

  return (
    <View>
      <CustomTextInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onPressSearch={onPressSearch}
        onPressClear={onPressClear}
      />
      <VirtualizedList
        data={moviesResults}
        renderItem={renderItem}
        getItem={getItem}
        getItemCount={getItemCount}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={<EmptyComponent onRetry={onPressSearch} />}
        refreshing={loading}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
      />
    </View>
  );
}
