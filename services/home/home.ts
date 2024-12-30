import { ENDPOINTS } from "@/constants/endpoints";
import { getFullApiUrl } from "@/lib/utils";
import { HomeResponse } from "@/types/home/home";

/**
 * Fetches the home screen data from the specified endpoint.
 *
 * @returns {Promise<HomeResponse>} A promise that resolves to the response containing the home screen data.
 */
export const fetchHome = async (): Promise<HomeResponse> => {
  try {
    const endpoint = getFullApiUrl(ENDPOINTS.home);
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Error fetching Home: ${response.statusText}`);
    }

    const data: HomeResponse = await response.json();

    return data;
  } catch (error) {
    throw new Error(
        `Failed to fetch Home: ${
          error instanceof Error ? error.message : error
        }`
      );
  }
}