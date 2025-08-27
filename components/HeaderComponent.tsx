import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
  },
  headerText: {
    fontSize: 18,
  },
});

const HeaderComponent = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>Liste des films</Text>
  </View>
);

export default HeaderComponent;
