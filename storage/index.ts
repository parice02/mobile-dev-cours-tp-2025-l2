import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV({
  mode: "multi-process",
  readOnly: false,
});
