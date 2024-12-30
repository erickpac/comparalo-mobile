import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCategoryProducts } from "@/services/categories/category-products";

type Props = {
  id: string;
};

/**
 * Custom hook to fetch products for a specific category using infinite queries.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.id - The ID of the category to fetch products for.
 *
 * @returns {Object} - The hook returns an object containing:
 * - `products` (Array): The list of products fetched.
 * - `isLoading` (boolean): Indicates if the data is currently being loaded.
 * - `isError` (boolean): Indicates if there was an error fetching the data.
 * - `error` (any): The error object if an error occurred.
 * - `isFetchingNextPage` (boolean): Indicates if the next page is currently being fetched.
 * - `hasNextPage` (boolean): Indicates if there are more pages to fetch.
 * - `refetch` (Function): Function to refetch the data.
 * - `fetchNextPage` (Function): Function to fetch the next page of data.
 */
export const useFetchCategoryProducts = ({ id }: Props) => {
  const {
    isLoading,
    isError,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["category-products", id],
    queryFn: ({ pageParam = 1 }) => fetchCategoryProducts({ id, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 3,
  });

  return {
    products: data?.pages.flatMap((page) => page.products) ?? [],
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    refetch,
    fetchNextPage,
  };
};
