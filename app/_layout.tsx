import "react-native-gesture-handler";

import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { FavoriteProvider } from "@/contexts/favorite.context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { UserProvider } from "../contexts/user.context";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ActionSheetProvider>
          <FavoriteProvider>
            <UserProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </UserProvider>
          </FavoriteProvider>
        </ActionSheetProvider>
      </ThemeProvider>
    </SafeAreaView>
  );
}
