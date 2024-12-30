import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";

export default function MoreScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const { t } = useTranslation();

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <Link href="/contactus" asChild>
        <TouchableOpacity style={styles.item}>
          <ThemedText style={styles.text}>{t("contactUs")}</ThemedText>
        </TouchableOpacity>
      </Link>
      <Link href="/aboutus" asChild>
        <TouchableOpacity style={styles.item}>
          <ThemedText style={styles.text}>{t("aboutUs")}</ThemedText>
        </TouchableOpacity>
      </Link>
      <Link href="/termsandconditions" asChild>
        <TouchableOpacity style={styles.item}>
          <ThemedText style={styles.text}>{t("termsAndConditions")}</ThemedText>
        </TouchableOpacity>
      </Link>
      <Link href="/privacypolicies" asChild>
        <TouchableOpacity style={styles.item}>
          <ThemedText style={styles.text}>{t("privacyPolicy")}</ThemedText>
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
