import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FallbackView } from "@/components/fallback-view";
import { HeaderContent } from "@/components/product-detail/header";
import { ProductImage } from "@/components/product-detail/image";
import { PriceComparison } from "@/components/product-detail/price-comparison";
import { useFetchProductDetails } from "@/hooks/product-details/useFetchProductDetails";
import { useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useEffect, useState } from "react";
import { PriceHistory } from "@/types/product/price-history";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { LineChart } from "react-native-chart-kit";
import { useTranslation } from "react-i18next";

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

type PriceHistoryViewProps = {
  priceHistory: PriceHistory[];
  backgroundColor: string;
};

const PriceHistoryView = ({
  priceHistory,
  backgroundColor,
}: PriceHistoryViewProps) => {
  const { t } = useTranslation();

  if (priceHistory.length == 0) {
    return null;
  }

  const lastThirtyDaysItem = t("productDetailLastThirtyDaysSegmentedOption");
  const lastNinetyDaysItem = t("productDetailLastNinetyDaysSegmentedOption");
  const segmentedControlItems = [lastThirtyDaysItem, lastNinetyDaysItem];
  const [segmentedControlSelectedIndex, setSegmentedControlSelectedIndex] =
    useState(1);
  const [priceHistoryData, setPriceHistoryData] = useState<PriceHistory[]>([]);

  useEffect(() => {
    const fromDate = new Date();
    const days = segmentedControlSelectedIndex == 0 ? 30 : 90;

    fromDate.setDate(fromDate.getDate() - days);

    const filteredData = priceHistory
      .filter(
        (item) => new Date(item.created_at).getTime() >= fromDate.getTime()
      )
      .sort((item1, item2) =>
        Date.parse(item1.created_at) < Date.parse(item2.created_at) ? -1 : 1
      );

    if (filteredData.length == 0) {
      setPriceHistoryData([
        { id: 1, current_price: 0, sale_price: 0, created_at: "" },
      ]);
    } else {
      setPriceHistoryData(filteredData);
    }
  }, [segmentedControlSelectedIndex]);

  return (
    <ThemedView style={{ rowGap: 8 }}>
      <ThemedText type="subtitle" style={{ paddingTop: 8 }}>
        {t("productDetailPriceHistoryTitle")}
      </ThemedText>

      <Text style={styles.greyedText}>
        {t("productDetailPriceHistorySubtitle")}
      </Text>

      <SegmentedControl
        values={segmentedControlItems}
        selectedIndex={segmentedControlSelectedIndex}
        onChange={(event) => {
          setSegmentedControlSelectedIndex(
            event.nativeEvent.selectedSegmentIndex
          );
        }}
      />

      <LineChart
        data={{
          labels: [],
          datasets: [
            { data: priceHistoryData.map((item) => item.current_price) },
          ],
        }}
        width={Dimensions.get("window").width - 16}
        height={220}
        yAxisLabel="Q. "
        chartConfig={{
          backgroundGradientFrom: backgroundColor,
          backgroundGradientTo: backgroundColor,
          color: () => "grey",
        }}
        bezier
      />
    </ThemedView>
  );
};

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
  greyedText: {
    color: "grey",
  },
});
