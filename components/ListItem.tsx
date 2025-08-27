import { useState } from "react";

import EmptyComponent from "@/components/EmptyComponent";
import FooterComponent from "@/components/FooterComponent";
import HeaderComponent from "@/components/HeaderComponent";
import Item from "@/components/Item";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, TextInput, View } from "react-native";

import { movies } from "@/data/movies";

const styles = StyleSheet.create({
  separator: {
    height: 0.4,
    backgroundColor: "#ccc",
  },
  searchInput: { padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, margin: 10 },
  searchIcon: { position: "absolute", right: 20, top: 15 },
});

export default function ListItem() {
  const [searchQuery, setSearchQuery] = useState("");
  const [moviesResults, setMoviesResults] = useState(movies.results);
  const [borderColor, setBorderColor] = useState("#ccc");
  const renderItem = ({ item }: { item: any }) => <Item item={item} />;
  const itemSeparator = () => <View style={styles.separator} />;

  const onPressSearch = () => {
    const filteredMovies = movies.results.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setMoviesResults(filteredMovies);
  };

  const onTextInputFocus = () => {
    setBorderColor("#007AFF");
  };

  const onTextInputBlur = () => {
    setBorderColor("#ccc");
  };

  return (
    <View>
      <TextInput
        placeholder="Rechercher..."
        style={[styles.searchInput, { borderColor }]}
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize={"none"}
        autoComplete={"off"}
        enterKeyHint={"search"}
        inputMode={"search"}
        onSubmitEditing={onPressSearch}
        onFocus={onTextInputFocus}
        onBlur={onTextInputBlur}
      />
      <Ionicons
        name={"search"}
        size={24}
        color={borderColor}
        style={styles.searchIcon}
        onPress={onPressSearch}
      />
      <FlatList
        data={moviesResults}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={<EmptyComponent />}
        ListFooterComponent={<FooterComponent length={moviesResults.length} />}
        ListHeaderComponent={<HeaderComponent />}
        refreshing={true}
      />
    </View>
  );
}
