import { FlatList, StyleSheet } from "react-native";
import { CategoryCard } from "@/components/categories/card";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useFetchCategories } from "@/hooks/categories/useFetchCategories";
import { ActivityIndicator } from "react-native";
import { FallbackView } from "@/components/fallback-view";
import { ThemedView } from "@/components/ThemedView";

export default function CategoriesScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const { data, isLoading, error } = useFetchCategories();

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.activityIndicator} />;
  }

  if (error) {
    return <FallbackView message={error.message} />;
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={data?.results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CategoryCard category={item} />}
        ListEmptyComponent={<FallbackView message="No categories found" />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
  },
});
