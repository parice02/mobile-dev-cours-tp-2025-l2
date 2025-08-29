import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { useUser } from "../../contexts/user.context";

export default function RootLayout() {
  const { user, setUser } = useUser();

  useEffect(() => {
    if (!user) {
      setUser();
    }
  }, [user, setUser]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Accueil",
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Compte",
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
