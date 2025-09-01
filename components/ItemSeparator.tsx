import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  separator: {
    margin: 3,
  },
});

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

export default ItemSeparator;
