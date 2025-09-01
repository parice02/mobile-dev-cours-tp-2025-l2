import { Image, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  image: {
    height: 300,
    marginBottom: 20,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
  },
});

const EmptyComponent = () => (
  <View style={styles.container}>
    <Image
      source={require("@/assets/images/content_not_found.png")}
      style={styles.image}
      resizeMode="contain"
    />
    <Text style={styles.title}>Aucun résultat</Text>
    <Text style={styles.subtitle}>
      Nous n’avons trouvé aucun film correspondant. Essayez une autre recherche.
    </Text>
  </View>
);

export default EmptyComponent;
