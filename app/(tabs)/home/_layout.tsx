import { headerColor } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return <Stack screenOptions={{ contentStyle: { backgroundColor: headerColor } }} />;
}
