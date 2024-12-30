import { StyleSheet, FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
import { FallbackView } from "@/components/fallback-view";
import { ProductCard } from "@/components/products/card";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { useFetchCategoryProducts } from "@/hooks/categories/useFetchCategoryProducts";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function CategoryProductsScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const params = useLocalSearchParams();
  const { products, isLoading, error, fetchNextPage } =
    useFetchCategoryProducts({
      id: String(params.id),
    });

  const handleLoadMore = () => {
    void fetchNextPage();
  };

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.activityIndicator} />;
  }

  if (error) {
    return <FallbackView message={error.message} />;
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
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
  row: {
    justifyContent: "space-between",
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
  },
  footer: {
    padding: 10,
    alignItems: "center",
  },
});
