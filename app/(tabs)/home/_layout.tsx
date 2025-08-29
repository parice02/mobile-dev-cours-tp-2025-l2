import CustomTextInput from "@/components/TextInput";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        options={({ navigation, route }) => ({
          title: "Movies Database",
          header: () => (
            <CustomTextInput
              searchQuery=""
              onPressClear={() => {}}
              onPressSearch={() => {}}
              setSearchQuery={() => {}}
            />
          ),
        })}
      />
    </Stack>
  );
}
