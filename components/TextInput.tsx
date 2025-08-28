import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchInput: {
    flex: 1,
    marginLeft: 6,
    fontSize: 16,
    color: "#000",
  },
  clearButton: {
    padding: 5,
  },
});

const CustomTextInput = ({
  searchQuery,
  setSearchQuery,
  onPressSearch,
  onPressClear,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onPressSearch: () => void;
  onPressClear: () => void;
}) => {
  const [borderColor, setBorderColor] = useState("#ccc");
  const onTextInputFocus = () => {
    setBorderColor("#007AFF");
  };

  const onTextInputBlur = () => {
    setBorderColor("#ccc");
  };

  return (
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
  );
};

export default CustomTextInput;
