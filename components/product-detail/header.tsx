import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Pressable, Text, Linking, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Money, formatMoney } from "@/lib/utils";
import { ProductDescription } from "./description";

type HeaderContentProps = {
  productDescription?: string;
  productPrice: Money;
  productdetailUrl: string;
  storeName: string;
};

export const HeaderContent = ({
  productDescription,
  productPrice,
  productdetailUrl,
  storeName,
}: HeaderContentProps) => {
  const { t } = useTranslation();

  return (
    <>
      <ProductDescription description={productDescription} />

      <ThemedText type="defaultSemiBold">
        {formatMoney(productPrice)}
      </ThemedText>

      <Pressable onPress={() => Linking.openURL(productdetailUrl)}>
        <ThemedView
          lightColor="black"
          darkColor="grey"
          style={styles.storeButtonContainer}
        >
          <Text style={styles.storeButtonText}>
            {t("productDetailButAtStoreButtonTitle")} {storeName}
          </Text>
        </ThemedView>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  storeButtonContainer: {
    borderRadius: 6,
  },
  storeButtonText: {
    color: "white",
    textAlign: "center",
    paddingVertical: 6,
  },
});
