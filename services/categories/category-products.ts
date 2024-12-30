import { ProductsByCategoryIdResponse } from "@/types/category/category";
import { Product } from "@/types/product/product";
import { getFullApiUrl } from "@/lib/utils";
import { ENDPOINTS } from "@/constants/endpoints";

type Props = {
  id: string;
  pageParam: number;
};

/**
 * Fetches products for a specific category.
 *
 * @param {Object} params - The parameters for fetching category products.
 * @param {string} params.id - The ID of the category.
 * @param {number} params.pageParam - The page number for pagination.
 * @returns {Promise<{ products: Product[]; nextCursor?: number }>} A promise that resolves to an object containing the products and the next cursor for pagination.
 * @throws {Error} If the fetch operation fails.
 */
export const fetchCategoryProducts = async ({
  id,
  pageParam,
}: Props): Promise<{
  products: Product[];
  nextCursor?: number;
}> => {
  try {
    const endpoint = getFullApiUrl(
      ENDPOINTS.productsByCategory
        .replace("{id}", id)
        .replace("{page}", pageParam.toString())
    );
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch products for category ID ${id}`);
    }

    const data: ProductsByCategoryIdResponse = await response.json();
    const currentPage = Number(data.info.currentPage);
    const nextCursor = data.info.next ? currentPage + 1 : undefined;

    return {
      products: data.results as Product[],
      nextCursor,
    };
  } catch (error) {
    throw new Error(
      `Failed to fetch category's products: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
};
