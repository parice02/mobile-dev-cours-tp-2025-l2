import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { headerColor } from "@/constants/Colors";

const styles = StyleSheet.create({
  container: { backgroundColor: headerColor },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 10,
    marginLeft: 30,
    marginRight: 30,
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
    <View style={styles.container}>
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
};

export default CustomTextInput;
