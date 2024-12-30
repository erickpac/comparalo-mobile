import { ThemedView } from "./ThemedView";
import { Image, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { HeroProductCategory } from "@/types/home/home";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";

type Props = {
  heroCategory: HeroProductCategory;
};

export function HomeHeader({ heroCategory }: Props) {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">
        {t("homeCategory")} {heroCategory.name}
      </ThemedText>
      <ThemedText lightColor="grey" darkColor="grey">
        {t("homeSubtitle")}
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
              {t("homeCategoriesButtonTitle")}
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
