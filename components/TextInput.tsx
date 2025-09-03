import { Ionicons } from "@expo/vector-icons";
import { forwardRef, memo, useState } from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { headerColor } from "@/constants/Colors";

const styles = StyleSheet.create({
  container: { backgroundColor: headerColor },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  clearButton: {
    padding: 5,
  },
});

export interface SearchBarProps extends Omit<ViewProps, "style"> {
  style?: StyleProp<ViewStyle>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onPressSearch: () => void;
  onPressClear: () => void;
}

const SearchBar = memo(
  forwardRef<typeof View, SearchBarProps>((props, ref) => {
    const { searchQuery, setSearchQuery, onPressSearch, onPressClear, style = {} } = props;
    const [borderColor, setBorderColor] = useState("#ccc");
    const onTextInputFocus = () => {
      setBorderColor("#007AFF");
    };
    const insets = useSafeAreaInsets();
    const onTextInputBlur = () => {
      setBorderColor("#ccc");
    };

    return (
      <View style={[styles.container, style, { paddingTop: 10, paddingBottom: 10, ...insets }]}>
        <View style={[styles.searchContainer, { borderColor }]}>
          <TextInput
            placeholder="Rechercher..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize={"none"}
            autoComplete={"off"}
            enterKeyHint={"search"}
            inputMode={"search"}
            onSubmitEditing={onPressSearch}
            onFocus={onTextInputFocus}
            onBlur={onTextInputBlur}
            clearButtonMode={"always"}
          />
          {searchQuery.length > 0 && Platform.OS === "android" && (
            <TouchableOpacity onPress={onPressClear} style={styles.clearButton}>
              <Ionicons name={"close"} size={24} color={"#888"} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onPressSearch}>
            <Ionicons name={"search"} size={24} color={borderColor} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }),
);
export default SearchBar;
