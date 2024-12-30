import { useFetchHome } from "@/hooks/home/useFetchHome";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { FallbackView } from "@/components/fallback-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ProductCard } from "@/components/products/card";
import { HomeHeader } from "@/components/HomeHeader";

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const { data, isLoading, error } = useFetchHome();

  if (isLoading || !data) {
    return <ActivityIndicator size="large" style={styles.activityIndicator} />;
  }

  if (error) {
    return <FallbackView message={error.message} />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={data.results.products}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => <ProductCard product={item.products} />}
        ListHeaderComponent={() => (
          <HomeHeader heroCategory={data.results.hero.product_categories} />
        )}
      />
    </SafeAreaView>
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
  row: {
    justifyContent: "space-between",
  },
});
