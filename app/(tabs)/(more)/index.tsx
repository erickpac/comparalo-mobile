import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";
import { i18n } from "@/locales/localization";

export default function MoreScreen() {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <Link href="/contactus" asChild>
        <TouchableOpacity style={styles.item}>
          <ThemedText style={styles.text}>{i18n.t("contactUs")}</ThemedText>
        </TouchableOpacity>
      </Link>
      <Link href="/aboutus" asChild>
        <TouchableOpacity style={styles.item}>
          <ThemedText style={styles.text}>{i18n.t("aboutUs")}</ThemedText>
        </TouchableOpacity>
      </Link>
      <Link href="/termsandconditions" asChild>
        <TouchableOpacity style={styles.item}>
          <ThemedText style={styles.text}>
            {i18n.t("termsAndConditions")}
          </ThemedText>
        </TouchableOpacity>
      </Link>
      <Link href="/privacypolicies" asChild>
        <TouchableOpacity style={styles.item}>
          <ThemedText style={styles.text}>{i18n.t("privacyPolicy")}</ThemedText>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 18,
  },
});
