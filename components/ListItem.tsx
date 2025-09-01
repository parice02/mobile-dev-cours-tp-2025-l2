import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, View, VirtualizedList } from "react-native";

import EmptyComponent from "@/components/EmptyComponent";
import Item from "@/components/Item";
import ItemSeparator from "@/components/ItemSeparator";
import { Movie } from "@/types/types";

import CustomTextInput from "@/components/TextInput";
import { useFavorite } from "@/contexts/favorite.context";

export default function ListItem({
  onPressSearch,
  onPressClear,
  moviesResults,
  onEndReached,
}: {
  onPressSearch: (searchQuery: string) => Promise<void>;
  onPressClear: () => Promise<void>;
  moviesResults: Movie[];
  onEndReached: (searchQuery: string) => Promise<void>;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { addFavorite, removeFavorite } = useFavorite();
  const navigation = useNavigation();

  const { showActionSheetWithOptions } = useActionSheet();

  const onListPressSearch = useCallback(async () => {
    setLoading(true);
    await onPressSearch(searchQuery);
    setLoading(false);
  }, [searchQuery, onPressSearch]);

  const onListEndReached = useCallback(async () => {
    setLoading(true);
    await onEndReached(searchQuery);
    setLoading(false);
  }, [searchQuery, onEndReached]);

  const onListPressClear = useCallback(async () => {
    setLoading(true);
    setSearchQuery("");
    await onPressClear();
    setLoading(false);
  }, [onPressClear]);

  const onLongPress = useCallback(
    (item: Movie) => {
      if (navigation.getId() === "/(tabs)/home") {
        const options = ["Ajouter aux favoris", "Annuler"];
        const icons = [
          <Ionicons name="heart" size={24} color="red" key={0} />,
          <Ionicons name="close" size={24} color="black" key={1} />,
        ];
        const cancelButtonIndex = 1;
        const cancelButtonTintColor = "#e0e0e0";
        const title = "Options";
        const tintColor = "#000";
        const message = "Voulez-vous vraiment ajouter ce film aux favoris ?";

        showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
            cancelButtonTintColor,
            title,
            tintColor,
            message,
            icons,
            showSeparators: true,
            separatorStyle: { backgroundColor: "#eee", height: 0.4 },
          },
          (selectedIndex: number | undefined) => {
            switch (selectedIndex) {
              case 0:
                addFavorite(item);
                break;

              case cancelButtonIndex:
                break;
            }
          },
        );
      } else if (navigation.getId() === "/(tabs)/favorite") {
        const options = ["Retirer des favoris", "Annuler"];
        const icons = [
          <Ionicons name="heart-dislike" size={24} color="red" key={0} />,
          <Ionicons name="close" size={24} color="black" key={1} />,
        ];
        const destructiveButtonIndex = 0;
        const cancelButtonIndex = 1;
        const cancelButtonTintColor = "#e0e0e0";
        const title = "Options";
        const tintColor = "#000";
        const message = "Voulez-vous retirer ce film des favoris ?";

        showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
            cancelButtonTintColor,
            destructiveButtonIndex,
            title,
            tintColor,
            message,
            icons,
            showSeparators: true,
            separatorStyle: { backgroundColor: "#eee", height: 0.4 },
          },
          (selectedIndex: number | undefined) => {
            switch (selectedIndex) {
              case 0:
                removeFavorite(item);
                break;

              case cancelButtonIndex:
                break;
            }
          },
        );
      }
    },
    [showActionSheetWithOptions, addFavorite, removeFavorite, navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Movie }) => (
      <Link
        onLongPress={() => onLongPress(item)}
        href={{ pathname: "/(tabs)/home/[id]", params: { id: item.id } }}
        asChild>
        <Pressable>
          <Item item={item} />
        </Pressable>
      </Link>
    ),
    [onLongPress],
  );
  const itemSeparator = useCallback(() => <ItemSeparator />, []);

  const getItem = useCallback((data: any, index: number) => data[index], []);
  const keyExtractor = useCallback((item: any) => `${item.id}`, []);
  const getItemCount = useCallback((data: any) => data.length, []);

  const onRefresh = async () => {};

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomTextInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onPressSearch={onListPressSearch}
          onPressClear={onListPressClear}
        />
      ),
    });
  }, [navigation, onListPressSearch, onListPressClear, searchQuery]);

  return (
    <View>
      <VirtualizedList
        data={moviesResults}
        renderItem={renderItem}
        getItem={getItem}
        getItemCount={getItemCount}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={<EmptyComponent onRetry={onListPressSearch} />}
        refreshing={loading}
        onEndReached={onListEndReached}
        onRefresh={onRefresh}
        contentInsetAdjustmentBehavior={"automatic"}
      />
    </View>
  );
}
