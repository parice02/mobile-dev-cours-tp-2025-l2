import { useCallback, useEffect, useState } from "react";
import { View, VirtualizedList } from "react-native";

import EmptyComponent from "@/components/EmptyComponent";
import FooterComponent from "@/components/FooterComponent";
import HeaderComponent from "@/components/HeaderComponent";
import Item from "@/components/Item";
import ItemSeparator from "@/components/ItemSeparator";
import CustomTextInput from "@/components/TextInput";

import { getMovies, searchMovies } from "@/data/tools";

import { Movie } from "@/types/types";

export default function ListItem() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [moviesResults, setMoviesResults] = useState<Movie[]>([]);

  const renderItem = useCallback(({ item }: { item: any }) => <Item item={item} />, []);
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
      setMoviesResults(m.results);
      setTotalPage(m.total_pages);
      setLoading(false);
    })();
  }, []);

  const onEndReached = useCallback(async () => {
    setLoading(true);
    if (page < totalPage) {
      setPage((prev) => prev + 1);
      if (searchQuery) {
        const movies = await searchMovies(searchQuery, page);
        setMoviesResults((prev) => [...prev, ...movies.results]);
      } else {
        const movies = await getMovies(page);
        setMoviesResults((prev) => [...prev, ...movies.results]);
      }
    }
    setLoading(false);
  }, [page, searchQuery, totalPage]);

  const getItem = useCallback((data: any, index: number) => data[index], []);
  const keyExtractor = useCallback((item: any) => `${item.id}`, []);
  const getItemCount = useCallback((data: any) => data.length, []);

  return (
    <View>
      <CustomTextInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onPressSearch={onPressSearch}
      />
      <VirtualizedList
        data={moviesResults}
        renderItem={renderItem}
        getItem={getItem}
        getItemCount={getItemCount}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={<EmptyComponent onRetry={onPressSearch} />}
        ListFooterComponent={<FooterComponent length={moviesResults.length} />}
        ListHeaderComponent={<HeaderComponent />}
        refreshing={loading}
        onEndReached={onEndReached}
      />
    </View>
  );
}
