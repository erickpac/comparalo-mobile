import { ENDPOINTS } from "@/constants/endpoints";
import { getFullApiUrl } from "@/lib/utils";
import { ProductDetailResponse } from "@/types/product/product";

type Props = {
  id: number;
};

export const fetchProductDetails = async ({ id }: Props): Promise<ProductDetailResponse> => {
  try {
    const endpoint = getFullApiUrl(
      ENDPOINTS.productDetails
        .replace("{id}", id.toString())
    );
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch products details for product ID ${id}`);
    }

    const data: ProductDetailResponse = await response.json();

    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch product details: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
};
