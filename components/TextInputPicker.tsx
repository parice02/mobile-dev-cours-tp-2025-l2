import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
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
  pickerWrapper: {
    width: 120,
    borderWidth: 0,
    borderRadius: 8,
    marginRight: 8,
    overflow: "hidden",
  },
  picker: {},
});

const TextInputPicker = ({
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
  const [searchType, setSearchType] = useState<"movie" | "tv">("movie");

  const onTextInputFocus = () => {
    setBorderColor("#007AFF");
  };

  const onTextInputBlur = () => {
    setBorderColor("#ccc");
  };

  return (
    <View style={[styles.searchContainer, { borderColor }]}>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={searchType}
          onValueChange={(value) => setSearchType(value)}
          style={styles.picker}
          dropdownIconColor="#555"
          mode="dialog">
          <Picker.Item label="🎬 Films" value="movie" />
          <Picker.Item label="📺 Séries" value="tv" />
        </Picker>
      </View>
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

export default TextInputPicker;
