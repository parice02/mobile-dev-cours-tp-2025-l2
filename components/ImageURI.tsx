import { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

const image_url = `https://www.themoviedb.org/t/p/w500/`;

const ImageURI = ({ uri, title, style }: { uri: string; title: string; style?: any }) => {
  const [loading, setLoading] = useState(true);
  return (
    <View style={[style, styles.container]}>
      {loading && <ActivityIndicator style={styles.loader} size="large" color="#E50914" />}
      <Image
        source={{ uri: image_url + uri }}
        alt={title}
        style={[StyleSheet.absoluteFill, { borderRadius: style?.borderRadius || 0 }]}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        resizeMode="cover"
      />
    </View>
  );
};

export default ImageURI;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  loader: {
    position: "absolute",
    zIndex: 1,
  },
});
