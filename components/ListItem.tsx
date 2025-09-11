import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import { memo, useCallback } from "react";
import { Pressable, View, VirtualizedList } from "react-native";

import EmptyComponent from "@/components/EmptyComponent";
import HeaderComponent from "@/components/HeaderComponent";
import Item from "@/components/Item";
import ItemSeparator from "@/components/ItemSeparator";
import { Movie } from "@/types/types";

import { useFavorite } from "@/contexts/favorite.context";

function ListItem({
  isLoading,
  moviesResults,
  onEndReached,
}: {
  isLoading: boolean;
  moviesResults: Movie[];
  onEndReached: () => Promise<void>;
}) {
  const { addFavorite, removeFavorite } = useFavorite();
  const navigation = useNavigation();
  const { showActionSheetWithOptions } = useActionSheet();

  const onLongPress = useCallback(
    (item: Movie) => {
      const options = ["Annuler"];
      let icons: any[] = [];
      let message = "";
      if (navigation.getId() === "/(tabs)/home") {
        options.unshift("Ajouter aux favoris");
        message = "Voulez-vous vraiment ajouter ce film aux favoris ?";
        icons = [
          <Ionicons name="heart" size={24} color="red" key={0} />,
          <Ionicons name="close" size={24} color="black" key={1} />,
        ];
      } else if (navigation.getId() === "/(tabs)/user") {
        options.unshift("Retirer des favoris");
        message = "Voulez-vous retirer ce film des favoris ?";
        icons = [
          <Ionicons name="heart-dislike" size={24} color="red" key={0} />,
          <Ionicons name="close" size={24} color="black" key={1} />,
        ];
      }

      const cancelButtonIndex = 1;
      const cancelButtonTintColor = "#e0e0e0";
      const title = "Options";
      const tintColor = "#000";

      const actions = {
        options,
        cancelButtonIndex,
        cancelButtonTintColor,
        title,
        tintColor,
        message,
        icons,
        showSeparators: true,
        separatorStyle: { backgroundColor: "#eee", height: 0.4 },
      };

      const addFavoriteAction = (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            addFavorite(item);
            break;

          case 1:
            break;
        }
      };

      const removeFavoriteAction = (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            removeFavorite(item);
            break;

          case 1:
            break;
        }
      };

      showActionSheetWithOptions(
        actions,
        navigation.getId() === "/(tabs)/home"
          ? addFavoriteAction
          : navigation.getId() === "/(tabs)/user"
          ? removeFavoriteAction
          : () => {},
      );
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

  const getItem = useCallback((data: Movie[], index: number) => data[index], []);
  const keyExtractor = useCallback((item: Movie) => `${item.id}`, []);
  const getItemCount = useCallback((data: Movie[]) => data.length, []);

  const onRefresh = async () => {};

  return (
    <View>
      <VirtualizedList
        data={moviesResults}
        renderItem={renderItem}
        getItem={getItem}
        getItemCount={getItemCount}
        keyExtractor={keyExtractor}
        ListHeaderComponent={<HeaderComponent />}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={<EmptyComponent />}
        refreshing={isLoading}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        contentInsetAdjustmentBehavior={"automatic"}
        windowSize={5}
        maxToRenderPerBatch={10}
        removeClippedSubviews
      />
    </View>
  );
}
export default memo(ListItem);
