import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  footerContainer: {
    padding: 10,
  },
  footerText: {
    fontSize: 18,
  },
});

const FooterComponent = ({ length }: { length: number }) => (
  <View style={styles.footerContainer}>
    <Text style={styles.footerText}>Votre liste contient {length} éléments</Text>
  </View>
);

export default FooterComponent;
