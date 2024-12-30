import { useEffect, useState } from "react";
import { PriceHistory } from "@/types/product/price-history";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { LineChart } from "react-native-chart-kit";
import { useTranslation } from "react-i18next";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Text, Dimensions, StyleSheet } from "react-native";

type PriceHistoryViewProps = {
  priceHistory: PriceHistory[];
  backgroundColor: string;
};

export const PriceHistoryView = ({
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
  greyedText: {
    color: "grey",
  },
});
