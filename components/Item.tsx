import { Image, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  item: {
    padding: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemTitle: {
    fontSize: 18,
    marginLeft: 10,
  },
  itemOverview: {
    fontSize: 14,
    marginLeft: 10,
    paddingRight: 10,
    color: "#757575",
  },
  itemSubtitle: {
    fontSize: 12,
    marginLeft: 10,
    color: "#b9b9b9",
  },
  icon: {
    marginLeft: 5,
  },
});

const image = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/`;

const Item = ({ item }: { item: any }) => {
  return (
    <View style={styles.item}>
      <Image source={{ uri: image + item.poster_path }} style={styles.avatar} alt={item.title} />
      <View>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemOverview} numberOfLines={3} ellipsizeMode={"tail"}>
          {item.overview}
        </Text>
        <Text style={styles.itemSubtitle}>
          Date de sortie: {item.release_date} - Moyenne votes: {item.vote_average}
        </Text>
      </View>
    </View>
  );
};

export default Item;
