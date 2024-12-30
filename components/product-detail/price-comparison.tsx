import { RelatedProduct } from "@/types/product/product";
import { formatMoney } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { View, Text, Image, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type PriceComparisonProps = {
  relatedProducts: RelatedProduct[];
  currency: string;
};

export const PriceComparison = ({
  relatedProducts,
  currency,
}: PriceComparisonProps) => {
  const { t } = useTranslation();

  if (relatedProducts.length == 0) {
    return null;
  }

  return (
    <>
      <ThemedText type="subtitle" style={{ paddingTop: 8 }}>
        {t("productDetailPriceComparisonTitle")}
      </ThemedText>

      <Text style={styles.greyedText}>
        {t("productDetailPriceComparisonSubtitle")}
      </Text>

      <ThemedView style={styles.table}>
        <ThemedView style={styles.tableRow}>
          <ThemedView style={styles.tableColumn}>
            <Text style={[styles.greyedText, { textAlign: "center" }]}>
              {t("productDetailPriceComparisonTableHeaderColumn1")}
            </Text>
          </ThemedView>

          <ThemedView style={styles.tableColumn}>
            <Text style={[styles.greyedText, { textAlign: "center" }]}>
              {t("productDetailPriceComparisonTableHeaderColumn2")}
            </Text>
          </ThemedView>

          <ThemedView style={styles.tableColumn}>
            <Text style={[styles.greyedText, { textAlign: "center" }]}>
              {t("productDetailPriceComparisonTableHeaderColumn3")}
            </Text>
          </ThemedView>

          <ThemedView style={styles.tableColumn}>
            <Text style={[styles.greyedText, { textAlign: "center" }]}>
              {t("productDetailPriceComparisonTableHeaderColumn4")}
            </Text>
          </ThemedView>
        </ThemedView>

        <View style={styles.divider} />

        {relatedProducts.map((relatedProduct) => (
          <ThemedView key={relatedProduct.id}>
            <ThemedView style={styles.tableRow}>
              <Image
                source={{ uri: relatedProduct.stores.logo }}
                style={[
                  styles.tableColumn,
                  { width: 100, height: 30, justifyContent: "center" },
                ]}
                resizeMode="contain"
              />

              <ThemedText style={styles.tableColumn}>
                {relatedProduct.name}
              </ThemedText>

              <ThemedText
                style={[styles.tableColumn, { textAlign: "right" }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {formatMoney({
                  amount: relatedProduct.current_price,
                  currency: currency,
                })}
              </ThemedText>

              <ThemedText style={[styles.tableColumn, { textAlign: "right" }]}>
                {relatedProduct.sale_price
                  ? formatMoney({
                      amount: relatedProduct.sale_price,
                      currency: currency,
                    })
                  : "-"}
              </ThemedText>
            </ThemedView>

            <View style={styles.divider} />
          </ThemedView>
        ))}
      </ThemedView>
    </>
  );
};

const styles = StyleSheet.create({
  greyedText: {
    color: "grey",
  },
  table: {
    paddingTop: 8,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColumn: {
    width: "25%",
    padding: 2,
  },
  divider: {
    backgroundColor: "#D3D3D3",
    height: 1,
  },
});
