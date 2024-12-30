import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/categories/categories";

/**
 * Custom hook to fetch categories using react-query.
 *
 * This hook utilizes the `useQuery` hook from react-query to fetch categories data.
 * It returns the fetched data, loading state, error state, and any error encountered during the fetch.
 *
 * @returns {Object} An object containing the following properties:
 * - `data`: The fetched categories data.
 * - `isLoading`: A boolean indicating if the data is currently being loaded.
 * - `isError`: A boolean indicating if there was an error during the fetch.
 * - `error`: The error encountered during the fetch, if any.
 */
export const useFetchCategories = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return { data, isLoading, isError, error };
};
