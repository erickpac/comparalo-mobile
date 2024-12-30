import { ThemedView } from "./ThemedView";
import { Image, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { HeroProductCategory } from "@/types/home/home";
import { Link } from "expo-router";
import { i18n } from "@/locales/localization";

type Props = {
  heroCategory: HeroProductCategory;
};

export function HomeHeader({ heroCategory }: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">
        {i18n.t("homeCategory")} {heroCategory.name}
      </ThemedText>
      <ThemedText lightColor="grey" darkColor="grey">
        {i18n.t("homeSubtitle")}
      </ThemedText>
      <Link
        href={{
          pathname: `/category/[id]`,
          params: { id: heroCategory.id, name: heroCategory.name },
        }}
        asChild
      >
        <Pressable style={styles.categoryNavigationButton}>
          <ThemedView
            lightColor="black"
            darkColor="grey"
            style={{ borderRadius: 15 }}
          >
            <ThemedText
              lightColor="white"
              darkColor="white"
              style={{ paddingVertical: 4, paddingHorizontal: 16 }}
            >
              {i18n.t("homeCategoriesButtonTitle")}
            </ThemedText>
          </ThemedView>
        </Pressable>
      </Link>
      <Image source={{ uri: heroCategory.logo }} style={styles.heroLogoImage} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
  },
  categoryNavigationButton: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  heroLogoImage: {
    width: "100%",
    height: 200,
  },
});
