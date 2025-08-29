import "react-native-gesture-handler";

import { SafeAreaView } from "react-native-safe-area-context";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Stack } from "expo-router";

import { FavoriteProvider } from "@/contexts/favorite.context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ActionSheetProvider>
        <FavoriteProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </FavoriteProvider>
      </ActionSheetProvider>
    </SafeAreaView>
  );
}
