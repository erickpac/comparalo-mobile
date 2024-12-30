import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(categories)"
        options={{
          title: "Categories",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "pricetag" : "pricetag-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(more)"
        options={{
          title: "More",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "menu" : "menu-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
