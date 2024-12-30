import { Product, RelatedProduct } from "@/types/product/product";
import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { ProductImagesCarousel } from "./carousel";

type ProductImageProps = {
  product: Product;
  relatedProducts: RelatedProduct[];
};

export const ProductImage = ({
  product,
  relatedProducts,
}: ProductImageProps) => {
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(
    product.image_url
  );

  return (
    <>
      <Image
        source={{ uri: currentImageUrl }}
        style={styles.highlightedImage}
      />

      <ProductImagesCarousel
        currentImageUrl={currentImageUrl}
        relatedProducts={relatedProducts}
        updatedHighlightedImage={(newUrl) => {
          setCurrentImageUrl(newUrl);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  highlightedImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
});
