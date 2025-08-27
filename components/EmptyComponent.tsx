import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 10,
  },
  emptyText: {
    fontSize: 18,
  },
});

const EmptyComponent = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>Aucun élément à afficher</Text>
  </View>
);

export default EmptyComponent;
