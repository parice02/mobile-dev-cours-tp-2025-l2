import { useUser } from "@/contexts/user.context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#3498db",
  },
  username: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  infoText: {
    fontSize: 15,
    color: "#555",
    marginLeft: 8,
  },
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3498db",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  favoriteText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default function Index() {
  const { user } = useUser();
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      navigation.setOptions({ title: user.name || `@${user.username}` });
    }
  }, [user, navigation]);

  const avatarUrl = user?.avatar.tmdb.avatar_path
    ? `https://image.tmdb.org/t/p/w200${user?.avatar.tmdb.avatar_path}`
    : `https://www.gravatar.com/avatar/${user?.avatar.gravatar.hash}`;

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />

      {/* Username */}
      <Text style={styles.username}>@{user.username}</Text>

      {/* Infos */}
      <View style={styles.infoRow}>
        <Ionicons name="language" size={18} color="#555" />
        <Text style={styles.infoText}>Langue : {user.iso_639_1.toUpperCase()}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="flag" size={18} color="#555" />
        <Text style={styles.infoText}>Pays : {user.iso_3166_1}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons
          name={user.include_adult ? "warning" : "shield-checkmark"}
          size={18}
          color={user.include_adult ? "#E74C3C" : "#27AE60"}
        />
        <Text style={styles.infoText}>
          Contenu adulte : {user.include_adult ? "Autorisé" : "Filtré"}
        </Text>
      </View>

      {/* Bouton favoris */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => router.push("/(tabs)/user/favorite")}>
        <Ionicons name="heart" size={20} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.favoriteText}>Voir mes favoris</Text>
      </TouchableOpacity>
      <SystemBars style={"auto"} />
    </View>
  );
}
