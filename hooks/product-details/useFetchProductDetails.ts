import { fetchProductDetails } from "@/services/product-details/product-details";
import { useQuery } from "@tanstack/react-query";

type Props = {
  id: number;
};

export const useFetchProductDetails = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product-details", id],
    queryFn: () => fetchProductDetails({ id }),
  });

  return { data, isLoading, isError, error };
};
