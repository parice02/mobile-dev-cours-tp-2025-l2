import { ThemedText } from "@/components/ThemedText";
import { useFavorite } from "@/contexts/favorite.context";
import { StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";

import Image from "@/components/ImageURI";
import { genres } from "@/data/genre";
import { Movie } from "@/types/types";

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff", // fond blanc type "card"
    marginHorizontal: 12,
    marginVertical: 5,
    padding: 12,
    borderRadius: 12, // arrondi doux
    shadowColor: "#000", // ombre iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3, // ombre Android
  },
  avatar: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: "#e0e0e0", // placeholder gris
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#212121",
  },
  itemOverview: {
    fontSize: 14,
    color: "#616161",
    lineHeight: 20,
    marginBottom: 6,
  },
  itemSubtitle: {
    flexDirection: "row",
    marginTop: 6,
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 6,
  },
  genreBadge: {
    backgroundColor: "#f1f3f4",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  genreText: {
    fontSize: 12,
    color: "#333",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f4",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    color: "#333",
  },
  badgeRating: {
    color: "#ff9800",
    fontWeight: "600",
  },
  favoriteText: {
    fontSize: 20,
    marginLeft: 8,
  },
});

const Item = ({ item }: { item: Movie }) => {
  const { favorites } = useFavorite();
  return (
    <View style={styles.item}>
      <Image uri={item.poster_path} style={styles.avatar} title={item.title} />
      <View style={styles.content}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ThemedText style={styles.itemTitle}>{item.title}</ThemedText>
          {favorites.find((m) => m.id === item.id) ? (
            <Animatable.Text
              animation={"pulse"}
              useNativeDriver={true}
              iterationCount={"infinite"}
              style={styles.favoriteText}>
              ❤️
            </Animatable.Text>
          ) : (
            <ThemedText style={styles.favoriteText}>🤍</ThemedText>
          )}
        </View>
        <ThemedText style={styles.itemOverview} numberOfLines={3} ellipsizeMode={"tail"}>
          {item.overview}
        </ThemedText>
        <View style={styles.genresContainer}>
          {item.genre_ids.map((genreId: number) => {
            const genre = genres.results.find((g) => g.id === genreId);
            return (
              <View key={genreId} style={styles.genreBadge}>
                <ThemedText style={styles.genreText}>{genre?.name}</ThemedText>
              </View>
            );
          })}
        </View>
        <View style={styles.itemSubtitle}>
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>
              🗓️&ensp;
              {new Date(item.release_date).toLocaleDateString("fr", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </ThemedText>
          </View>
          <View style={styles.badge}>
            <ThemedText style={[styles.badgeText, styles.badgeRating]}>
              ⭐&ensp;{item.vote_average}/10
            </ThemedText>
          </View>
          <View style={styles.badge}>
            <ThemedText style={[styles.badgeText, styles.badgeRating]}>
              {item.adult ? "🔞" : "👨‍👩‍👧"}
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Item;
