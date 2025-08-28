import { StyleSheet, View } from "react-native";

import ListItem from "@/components/ListItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default function Index() {
  return (
    <View style={styles.container}>
      <ListItem />
    </View>
  );
}
