import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
//import * as SplashScreen from "expo-splash-screen";

import { FavoriteProvider } from "@/contexts/favorite.context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect } from "react";
import { ServerProvider } from "../contexts/server.context";
import { UserProvider } from "../contexts/user.context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ServerProvider>
        <ActionSheetProvider>
          <FavoriteProvider>
            <UserProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
              </Stack>
            </UserProvider>
          </FavoriteProvider>
        </ActionSheetProvider>
      </ServerProvider>
    </ThemeProvider>
  );
}
