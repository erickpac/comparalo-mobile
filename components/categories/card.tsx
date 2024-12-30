import { Link } from "expo-router";
import { Pressable, StyleSheet, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Category } from "@/types/category/category";
import { useThemeColor } from "@/hooks/useThemeColor";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const borderColor = useThemeColor({}, "border");

  return (
    <Link
      href={{
        pathname: `/category/[id]`,
        params: { id: category.id, name: category.name },
      }}
      asChild
    >
      <Pressable>
        <ThemedView style={[styles.card, { borderColor }]}>
          <Image source={{ uri: category.logo }} style={styles.image} />
          <ThemedView style={styles.details}>
            <ThemedText numberOfLines={1} style={styles.name}>
              {category.name}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1.5,
    borderRadius: 8,
    marginVertical: 8,
  },
  image: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  details: {
    padding: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  name: {
    fontSize: 18,
  },
});
