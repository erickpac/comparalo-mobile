import { Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function CategoriesLayout() {
  const tintColor = useThemeColor({}, "tint");

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Categories",
          headerTintColor: tintColor,
        }}
      />
      <Stack.Screen
        name="category/[id]"
        options={({ route }) => ({
          title: route.params?.name ?? "Category",
          headerBackTitleVisible: false,
          headerTintColor: tintColor,
        })}
      />
    </Stack>
  );
}
