import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Stack } from "expo-router";

import { FavoriteProvider } from "@/contexts/favorite.context";

export default function RootLayout() {
  return (
    <ActionSheetProvider>
      <FavoriteProvider >
        <Stack
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </FavoriteProvider>
    </ActionSheetProvider>
  );
}
