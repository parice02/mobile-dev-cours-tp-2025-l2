import Image from "@/components/ImageURI";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MovieDetail } from "../types/types";

const DetailsScreen = ({ movie }: { movie: MovieDetail }) => {
  return (
    <>
      {/* Poster + Meta */}
      <View style={styles.posterSection}>
        <Image uri={movie.poster_path} style={styles.poster} title={movie.title} />
        <View style={styles.meta}>
          <Text>
            🗓️&ensp;
            {new Date(movie.release_date).toLocaleDateString("fr", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </Text>
          <Text>
            ⭐&ensp;{movie.vote_average} ({movie.vote_count} votes)
          </Text>
          <Text>⏱️&ensp;{movie.runtime} min</Text>
          <Text>{movie.adult ? "🔞 Adult" : "👨‍👩‍👧 Tout public"}</Text>
          <Text>Status: {movie.status}</Text>
        </View>
      </View>

      {/* Genres */}
      <View style={styles.genres}>
        {movie.genres.map((g) => (
          <View key={g.id} style={styles.genreBadge}>
            <Text style={styles.genreText}>{g.name}</Text>
          </View>
        ))}
      </View>

      {/* Overview */}
      <Text style={styles.sectionTitle}>Synopsis</Text>
      <Text style={styles.overview}>{movie.overview}</Text>

      {/* Infos techniques */}
      <Text style={styles.sectionTitle}>Détails</Text>
      <Text>
        🎬 Titre original : {movie.original_title} ({movie.original_language})
      </Text>
      <Text>🌍&ensp;Pays d’origine : {movie.origin_country.join(", ")}</Text>
      <Text>💰&ensp;Budget : ${movie.budget.toLocaleString()}</Text>
      <Text>💵&ensp;Revenus : ${movie.revenue.toLocaleString()}</Text>
      <Text>🔥&ensp;Popularité : {movie.popularity}</Text>

      {/* Production */}
      <Text style={styles.sectionTitle}>Production</Text>
      {movie.production_companies.map((c) => (
        <Text key={c.id}>🏢&ensp;{c.name}</Text>
      ))}
      <Text>Pays : {movie.production_countries.map((c) => c.name).join(", ")}</Text>

      {/* Langues */}
      <Text style={styles.sectionTitle}>Langues parlées</Text>
      <Text>{movie.spoken_languages.map((l) => l.english_name).join(", ")}</Text>

      {/* Liens externes */}
      <View style={styles.links}>
        {movie.homepage ? (
          <TouchableOpacity onPress={() => Linking.openURL(movie.homepage)}>
            <Text style={styles.link}>🌐&ensp;Site officiel</Text>
          </TouchableOpacity>
        ) : null}
        {movie.imdb_id ? (
          <TouchableOpacity
            onPress={() => Linking.openURL(`https://www.imdb.com/title/${movie.imdb_id}`)}>
            <Text style={styles.link}>🎬&ensp;Voir sur IMDB</Text>
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
