import { RelatedProduct } from "@/types/product/product";
import { Image, FlatList, Pressable, StyleSheet } from "react-native";
import { useEffect } from "react";

type ProductImagesCarouselProps = {
  currentImageUrl: string;
  relatedProducts: RelatedProduct[];
  updatedHighlightedImage: (newUrl: string) => void;
};

export const ProductImagesCarousel = ({
  currentImageUrl,
  relatedProducts,
  updatedHighlightedImage,
}: ProductImagesCarouselProps) => {
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
      renderItem={({ item }) => (
        <Pressable onPress={() => updatedHighlightedImage(item.image_url)}>
          <Image
            source={{ uri: item.image_url }}
            style={[
              styles.carouselImage,
              { borderWidth: item.image_url == currentImageUrl ? 1 : 0 },
            ]}
          />
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  carouselImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    overflow: "hidden",
    borderRadius: 8,
    borderColor: "grey",
  },
});
