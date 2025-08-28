import { Image } from "react-native";

const image_url = `https://www.themoviedb.org/t/p/w500/`;

const ImageURI = ({ uri, title, style }: { uri: string; title: string; style?: any }) => (
  <Image
    source={{ uri: image_url + uri }}
    style={style}
    alt={title}
    loadingIndicatorSource={require("@/assets/images/loading.gif")}
  />
);

export default ImageURI;
