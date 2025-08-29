import Image from "@/components/ImageURI";
import { ThemedText } from "@/components/ThemedText";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";

import { MovieDetail } from "../types/types";

const DetailsScreen = ({ movie }: { movie: MovieDetail }) => {
  return (
    <>
      {/* Poster + Meta */}
      <View style={styles.posterSection}>
        <Image uri={movie.poster_path} style={styles.poster} title={movie.title} />
        <View style={styles.meta}>
          <ThemedText>
            🗓️&ensp;
            {new Date(movie.release_date).toLocaleDateString("fr", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </ThemedText>
          <ThemedText>
            ⭐&ensp;{movie.vote_average} ({movie.vote_count} votes)
          </ThemedText>
          <ThemedText>⏱️&ensp;{movie.runtime} min</ThemedText>
          <ThemedText>{movie.adult ? "🔞 Adult" : "👨‍👩‍👧 Tout public"}</ThemedText>
          <ThemedText>Status: {movie.status}</ThemedText>
        </View>
      </View>

      {/* Genres */}
      <View style={styles.genres}>
        {movie.genres.map((g) => (
          <View key={g.id} style={styles.genreBadge}>
            <ThemedText style={styles.genreText}>{g.name}</ThemedText>
          </View>
        ))}
      </View>

      {/* Overview */}
      <ThemedText style={styles.sectionTitle}>Synopsis</ThemedText>
      <ThemedText style={styles.overview}>{movie.overview}</ThemedText>

      {/* Infos techniques */}
      <ThemedText style={styles.sectionTitle}>Détails</ThemedText>
      <ThemedText>
        🎬 Titre original : {movie.original_title} ({movie.original_language})
      </ThemedText>
      <ThemedText>🌍&ensp;Pays d’origine : {movie.origin_country.join(", ")}</ThemedText>
      <ThemedText>💰&ensp;Budget : ${movie.budget.toLocaleString()}</ThemedText>
      <ThemedText>💵&ensp;Revenus : ${movie.revenue.toLocaleString()}</ThemedText>
      <ThemedText>🔥&ensp;Popularité : {movie.popularity}</ThemedText>

      {/* Production */}
      <ThemedText style={styles.sectionTitle}>Production</ThemedText>
      {movie.production_companies.map((c) => (
        <ThemedText key={c.id}>🏢&ensp;{c.name}</ThemedText>
      ))}
      <ThemedText>Pays : {movie.production_countries.map((c) => c.name).join(", ")}</ThemedText>

      {/* Langues */}
      <ThemedText style={styles.sectionTitle}>Langues parlées</ThemedText>
      <ThemedText>{movie.spoken_languages.map((l) => l.english_name).join(", ")}</ThemedText>

      {/* Liens externes */}
      <View style={styles.links}>
        {movie.homepage ? (
          <TouchableOpacity onPress={() => Linking.openURL(movie.homepage)}>
            <ThemedText style={styles.link}>🌐&ensp;Site officiel</ThemedText>
          </TouchableOpacity>
        ) : null}
        {movie.imdb_id ? (
          <TouchableOpacity
            onPress={() => Linking.openURL(`https://www.imdb.com/title/${movie.imdb_id}`)}>
            <ThemedText style={styles.link}>🎬&ensp;Voir sur IMDB</ThemedText>
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: "#ccc",
    fontStyle: "italic",
    marginBottom: 12,
    textAlign: "center",
  },
  posterSection: {
    flexDirection: "row",
    margin: 16,
    alignItems: "flex-start",
  },
  poster: {
    width: 140,
    height: 210,
    borderRadius: 12,
    marginRight: 16,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },
  meta: {
    flex: 1,
    justifyContent: "center",
    gap: 6,
  },
  genres: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  genreBadge: {
    backgroundColor: "#1f1f1f",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    margin: 4,
    borderWidth: 1,
    borderColor: "#333",
  },
  genreText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
    marginHorizontal: 16,
    fontWeight: "700",
    fontSize: 18,
    color: "#000",
  },
  overview: {
    marginHorizontal: 16,
    marginBottom: 16,
    fontSize: 18,
    lineHeight: 22,
    color: "#1f1f1f",
    textAlign: "justify",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginVertical: 4,
    alignSelf: "flex-start",
  },
  badgeText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#eee",
    fontWeight: "500",
  },
  links: {
    margin: 16,
    marginTop: 24,
  },
  link: {
    backgroundColor: "#E50914",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
    marginTop: 12,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
