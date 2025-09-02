import Detail from "@/components/Detail";
import Image from "@/components/ImageURI";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useServer } from "@/contexts/server.context";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import { SafeAreaView } from "react-native-safe-area-context";

import { MovieDetail } from "@/types/types";

const DetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const navigation = useNavigation();
  const { getMovieDetail } = useServer();

  useEffect(() => {
    (async () => {
      const m = await getMovieDetail(id);
      setMovie(m);

      if (navigation.isFocused()) {
        navigation.setOptions({ title: m.title });
      }
      setLoading(false);
    })();
  }, [id, navigation, getMovieDetail]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={"large"} color={"#E50914"} />
      </View>
    );
  }

  if (!movie) return null;

  return (
    <SafeAreaView style={styles.container}>
      <SystemBars style={"auto"} />
      <ParallaxScrollView
        headerImage={
          <Image uri={movie.backdrop_path} title={movie.title} style={styles.backdrop} />
        }
        headerBackgroundColor={{ light: "#fff", dark: "#000" }}
        title={movie.title}
        tagline={movie.tagline}>
        <Detail movie={movie} />
      </ParallaxScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
});
