import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FallbackView } from "@/components/fallback-view";
import { useFetchProductDetails } from "@/hooks/productDetails/useFetchProductDetails";
import { Money, formatMoney } from "@/lib/utils";
import { useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import { ActivityIndicator, Dimensions, FlatList, Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Product, RelatedProduct } from "@/types/product/product";
import { useEffect, useState } from "react";
import { PriceHistory } from "@/types/product/price-history";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { LineChart } from "react-native-chart-kit";
import { i18n } from "@/locales/localization";

export default function ProductDetailScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const params = useLocalSearchParams();
  const { data, isLoading, error } = useFetchProductDetails({ id: Number(params.id) });
  const CURRENCY: string = Constants.expoConfig?.extra?.currency ?? "GTQ";
  
  if (isLoading || !data) {
    return <ActivityIndicator size="large" style={styles.activityIndicator} />;
  }

  if (error) {
    return <FallbackView message={error.message} />;
  }

  return (
    <ScrollView style={{ backgroundColor }}>
      <ThemedView style={styles.container}>
        
        <HeaderContent
          productDescription={data.results.product.description}
          productPrice={{ amount: data.results.product.current_price, currency: CURRENCY }}
          storeUrl={data.results.product.stores.address}
          storeName={data.results.product.stores.name}
        />

        <ProductImage
          product={data.results.product}
          relatedProducts={data.results.relatedProducts}
        />

        <PriceComparison
          relatedProducts={data.results.relatedProducts}
          currency={CURRENCY}
        />

        <PriceHistoryView
          priceHistory={data.results.priceHistory}
          backgroundColor={backgroundColor}
        />
      </ThemedView>
    </ScrollView>
  );
};

type HeaderContentProps = {
  productDescription?: string;
  productPrice: Money;
  storeUrl: string;
  storeName: string;
}

const HeaderContent = ({ productDescription, productPrice, storeUrl, storeName }: HeaderContentProps) => {
  return (
    <>
      <ProductDescription description={productDescription} />

      <ThemedText type="defaultSemiBold">
        {formatMoney(productPrice)}
      </ThemedText>

      <Pressable onPress={() => Linking.openURL(storeUrl)}>
        <ThemedView
          lightColor="black"
          darkColor="grey"
          style={styles.storeButtonContainer}
        >
          <Text style={styles.storeButtonText}>
            {i18n.t("productDetailButAtStoreButtonTitle")} {storeName}
          </Text>
        </ThemedView>
      </Pressable>
    </>
  );
};

const ProductDescription = ({ description }: { description?: string }) => {
  if (!description) {
    return null;
  }

  return <Text style={styles.greyedText}>{description}</Text>
};

type ProductImageProps = {
  product: Product;
  relatedProducts: RelatedProduct[];
}

const ProductImage = ({ product, relatedProducts }: ProductImageProps) => {
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(product.image_url);

  return (
    <>
      <Image
        source={{ uri: currentImageUrl }}
        style={styles.highlightedImage}
      />

      <ProductImagesCarousel
        currentImageUrl={currentImageUrl}
        relatedProducts={relatedProducts}
        updatedHighlightedImage={ (newUrl) =>{
          setCurrentImageUrl(newUrl);
        }}
      />
    </>
  );
};

type ProductImagesCarouselProps = {
  currentImageUrl: string;
  relatedProducts: RelatedProduct[];
  updatedHighlightedImage: (newUrl: string) => void;
}

const ProductImagesCarousel = ({ currentImageUrl, relatedProducts, updatedHighlightedImage }: ProductImagesCarouselProps) => {
  if (relatedProducts.length < 1) {
    return null;
  }

  useEffect(() => {
    updatedHighlightedImage(relatedProducts[0].image_url);
  }, []);

  return (
    <FlatList
      horizontal
      data={relatedProducts}
      renderItem={({ item }) =>
        <Pressable onPress={() => updatedHighlightedImage(item.image_url)}>
          <Image
            source={{ uri: item.image_url }}
            style={[styles.carouselImage, { borderWidth: item.image_url == currentImageUrl ? 1 : 0 }]}
          />
        </Pressable>
      }
    />
  );
};

type PriceComparisonProps = {
  relatedProducts: RelatedProduct[];
  currency: string;
}

const PriceComparison = ({ relatedProducts, currency }: PriceComparisonProps) => {
  if (relatedProducts.length == 0) {
    return null;
  }

  return (
    <>
      <ThemedText type="subtitle" style={{ paddingTop: 8 }}>
        {i18n.t("productDetailPriceComparisonTitle")}
      </ThemedText>

      <Text style={styles.greyedText}>
        {i18n.t("productDetailPriceComparisonSubtitle")}
      </Text>

      <ThemedView style={styles.table}>
        <ThemedView style={styles.tableRow}>
          <ThemedView style={styles.tableColumn}>
            <Text style={[styles.greyedText, { textAlign: "center" }]}>
              {i18n.t("productDetailPriceComparisonTableHeaderColumn1")}
            </Text>
          </ThemedView>

          <ThemedView style={styles.tableColumn}>
            <Text style={[styles.greyedText, { textAlign: "center" }]}>
              {i18n.t("productDetailPriceComparisonTableHeaderColumn2")}
            </Text>
          </ThemedView>

          <ThemedView style={styles.tableColumn}>
            <Text style={[styles.greyedText, { textAlign: "center" }]}>
              {i18n.t("productDetailPriceComparisonTableHeaderColumn3")}
            </Text>
          </ThemedView>

          <ThemedView style={styles.tableColumn}>
            <Text style={[styles.greyedText, { textAlign: "center" }]}>
              {i18n.t("productDetailPriceComparisonTableHeaderColumn4")}
            </Text>
          </ThemedView>

          
        </ThemedView>

        <View style={styles.divider} />

        {relatedProducts.map(relatedProduct => (
          <ThemedView key={relatedProduct.id}>
            <ThemedView style={styles.tableRow}>
              <Image 
                source={{ uri: relatedProduct.stores.logo }}
                style={[styles.tableColumn, { width: 100, height: 30, justifyContent: "center" }]}
                resizeMode="contain"
              />

              <ThemedText style={styles.tableColumn}>
                {relatedProduct.name}
              </ThemedText>

              <ThemedText style={[styles.tableColumn, { textAlign: "right" }]} numberOfLines={1} ellipsizeMode="tail">
                {formatMoney({ amount: relatedProduct.current_price, currency: currency })}
              </ThemedText>

              <ThemedText style={[styles.tableColumn, { textAlign: "right" }]}>
                {relatedProduct.sale_price ? formatMoney({ amount: relatedProduct.sale_price, currency: currency }) : "-"}
              </ThemedText>
            </ThemedView>

            <View style={styles.divider} />
          </ThemedView>
        ))}
      </ThemedView>
    </>
  );
}

type PriceHistoryViewProps = {
  priceHistory: PriceHistory[];
  backgroundColor: string;
}

const PriceHistoryView = ({ priceHistory, backgroundColor }: PriceHistoryViewProps) => {
  if (priceHistory.length == 0) {
    return null;
  }
  
  const lastThirtyDaysItem = i18n.t("productDetailLastThirtyDaysSegmentedOption");
  const lastNinetyDaysItem = i18n.t("productDetailLastNinetyDaysSegmentedOption");
  const segmentedControlItems = [lastThirtyDaysItem, lastNinetyDaysItem];
  const [segmentedControlSelectedIndex, setSegmentedControlSelectedIndex] = useState(1);
  const [priceHistoryData, setPriceHistoryData] = useState<PriceHistory[]>([]);

  useEffect(() => {
    const fromDate = new Date();
    const days = segmentedControlSelectedIndex == 0 ? 30 : 90;

    fromDate.setDate(fromDate.getDate() - days);

    const filteredData = priceHistory
      .filter(item => new Date(item.created_at).getTime() >= fromDate.getTime())
      .sort((item1, item2) => Date.parse(item1.created_at) < Date.parse(item2.created_at) ? -1 : 1);

    if (filteredData.length == 0) {
      setPriceHistoryData([{ id: 1, current_price: 0, sale_price: 0, created_at: ""  }])
    } else {
      setPriceHistoryData(filteredData);
    }
  }, [segmentedControlSelectedIndex]);

  return (
    <ThemedView style={{ rowGap: 8 }}>
      <ThemedText type="subtitle" style={{ paddingTop: 8 }}>
        {i18n.t("productDetailPriceHistoryTitle")}
      </ThemedText>

      <Text style={styles.greyedText}>
        {i18n.t("productDetailPriceHistorySubtitle")}
      </Text>

      <SegmentedControl
        values={segmentedControlItems}
        selectedIndex={segmentedControlSelectedIndex}
        onChange={ (event) => { setSegmentedControlSelectedIndex(event.nativeEvent.selectedSegmentIndex) }}
      />

      <LineChart
        data={{
          labels: [],
          datasets: [
            { data: priceHistoryData.map((item) => item.current_price) }
          ]
        }}
        width={Dimensions.get("window").width - 16 }
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
    gap: 10
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center"
  },
  greyedText: {
    color: "grey"
  },
  storeButtonContainer: {
    borderRadius: 6
  },
  storeButtonText: {
    color: "white",
    textAlign: "center",
    paddingVertical: 6
  },
  highlightedImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  carouselImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    overflow: "hidden",
    borderRadius: 8,
    borderColor: "grey"
  },
  table: {
    paddingTop: 8
  },
  tableRow: {
    flexDirection: "row"
  },
  tableColumn: {
    width: "25%",
    padding: 2
  },
  divider: {
    backgroundColor: "#D3D3D3",
    height: 1
  }
});
