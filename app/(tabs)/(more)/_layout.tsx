import { Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function CategoriesLayout() {
  const tintColor = useThemeColor({}, "tint");

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "More",
          headerTintColor: tintColor,
        }}
      />
      <Stack.Screen
        name="contactus"
        options={{
          title: "Contact Us",
          headerTintColor: tintColor,
        }}
      />
      <Stack.Screen
        name="aboutus"
        options={{
          title: "About Us",
          headerTintColor: tintColor,
        }}
      />
      <Stack.Screen
        name="termsandconditions"
        options={{
          title: "Terms and Conditions",
          headerTintColor: tintColor,
        }}
      />
      <Stack.Screen
        name="privacypolicies"
        options={{
          title: "Privacy Policies",
          headerTintColor: tintColor,
        }}
      />
    </Stack>
  );
}
