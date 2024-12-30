import { fetchHome } from "@/services/home/home";
import { useQuery } from "@tanstack/react-query";

export const useFetchHome = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["home"],
    queryFn: fetchHome
  });

  return {data, isLoading, isError, error }
}