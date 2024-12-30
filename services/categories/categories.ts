import { CategoriesResponse } from "@/types/category/category";
import { getFullApiUrl } from "@/lib/utils";
import { ENDPOINTS } from "@/constants/endpoints";

/**
 * Fetches the list of categories from the specified endpoint.
 *
 * @returns {Promise<CategoriesResponse>} A promise that resolves to the response containing the categories.
 */
export const fetchCategories = async (): Promise<CategoriesResponse> => {
  try {
    const endpoint = getFullApiUrl(ENDPOINTS.categories);
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }

    const data: CategoriesResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch categories: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
};
