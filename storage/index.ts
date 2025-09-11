import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV({
  id: "mmkv.default",
  mode: "multi-process",
  readOnly: false,
});
