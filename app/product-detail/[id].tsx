import { ThemedView } from "@/components/ThemedView";
import { FallbackView } from "@/components/fallback-view";
import { HeaderContent } from "@/components/product-detail/header";
import { ProductImage } from "@/components/product-detail/image";
import { PriceComparison } from "@/components/product-detail/price-comparison";
import { PriceHistoryView } from "@/components/product-detail/price-history";
import { useFetchProductDetails } from "@/hooks/product-details/useFetchProductDetails";
import { useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ProductDetailScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const params = useLocalSearchParams();
  const { data, isLoading, error } = useFetchProductDetails({
    id: Number(params.id),
  });
  const CURRENCY: string = Constants.expoConfig?.extra?.currency ?? "GTQ";

  if (isLoading || !data) {
    return <ActivityIndicator size="large" style={styles.activityIndicator} />;
  }

  if (error) {
    return <FallbackView message={error.message} />;
  }

  const product = data.results.product;
  const relatedProducts = data.results.relatedProducts;
  const priceHistory = data.results.priceHistory;

  return (
    <ScrollView style={{ backgroundColor }}>
      <ThemedView style={styles.container}>
        <HeaderContent
          productDescription={product.description}
          productPrice={{
            amount: product.current_price,
            currency: CURRENCY,
          }}
          productdetailUrl={product.detail_url}
          storeName={product.stores.name}
        />

        <ProductImage product={product} relatedProducts={relatedProducts} />

        <PriceComparison
          relatedProducts={relatedProducts}
          currency={CURRENCY}
        />

        <PriceHistoryView
          priceHistory={priceHistory}
          backgroundColor={backgroundColor}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    gap: 10,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
  },
});
