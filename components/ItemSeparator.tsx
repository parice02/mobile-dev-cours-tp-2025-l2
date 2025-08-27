import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 0.2,
    backgroundColor: "#ccc",
  },
});

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

export default ItemSeparator;
