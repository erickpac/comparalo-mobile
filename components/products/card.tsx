import { StyleSheet, Image, Pressable } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Product } from "@/types/product/product";
import Constants from "expo-constants";
import { formatMoney } from "@/lib/utils";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { i18n } from "@/locales/localization";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const CURRENCY = Constants.expoConfig?.extra?.CURRENCY ?? "GTQ";
  const shadowColor = useThemeColor({}, "shadow");
  const router = useRouter();

  return (
    <ThemedView style={[styles.card, { shadowColor }]}>
      <ThemedView style={styles.imageContainer}>
        <Image
          source={{ uri: product.image_url }}
          style={styles.image}
          resizeMode="contain"
        />
      </ThemedView>
      <ThemedText style={styles.name}>{product.name}</ThemedText>
      <ThemedText style={styles.description}>
        {product.description ?? "No description"}
      </ThemedText>
      <ThemedText style={styles.price}>
        {formatMoney({ amount: product.current_price, currency: CURRENCY })}
      </ThemedText>

    <ThemedView style={styles.bottomContainer}>
        <Pressable
          onPress={ () => router.navigate({
            pathname: "/productDetail/[id]",
            params: {
              id: product.id,
              name: product.name
            }
          })}
        >
          <ThemedView
            lightColor="black"
            darkColor="grey"
            style={styles.viewDetailsContainer}
          >
            <ThemedText
              lightColor="white"
              darkColor="white"
              style={styles.viewDetailsText}
            >
              {i18n.t("productCardViewDetailsButtonTitle")}
            </ThemedText>
          </ThemedView>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: "48%", // Adjust width for two columns
    elevation: 2, // Add shadow for Android
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  imageContainer: {
    width: "100%",
    height: 150, // Fixed height to make all images uniform
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10, // Matches the card's border radius
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontWeight: "bold",
    marginTop: 5,
  },
  description: {
    fontSize: 12,
    marginVertical: 5,
  },
  price: {
    fontWeight: "bold",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 8,
  },
  viewDetailsContainer: {
    borderRadius: 6,
  },
  viewDetailsText: {
    textAlign: "center",
    paddingVertical: 4,
  },
});
