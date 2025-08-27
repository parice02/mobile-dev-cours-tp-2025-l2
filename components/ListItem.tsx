import { useState } from "react";
import { FlatList, View } from "react-native";

import EmptyComponent from "@/components/EmptyComponent";
import FooterComponent from "@/components/FooterComponent";
import HeaderComponent from "@/components/HeaderComponent";
import Item from "@/components/Item";
import ItemSeparator from "@/components/ItemSeparator";
import CustomTextInput from "@/components/TextInput";

import { movies } from "@/data/movies";

export default function ListItem() {
  const [searchQuery, setSearchQuery] = useState("");
  const [moviesResults, setMoviesResults] = useState(movies.results);

  const renderItem = ({ item }: { item: any }) => <Item item={item} />;
  const itemSeparator = () => <ItemSeparator />;

  const onPressSearch = () => {
    const filteredMovies = movies.results.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setMoviesResults(filteredMovies);
  };

  return (
    <View>
      <CustomTextInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onPressSearch={onPressSearch}
      />
      <FlatList
        data={moviesResults}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={<EmptyComponent onRetry={onPressSearch} />}
        ListFooterComponent={<FooterComponent length={moviesResults.length} />}
        ListHeaderComponent={<HeaderComponent />}
      />
    </View>
  );
}
