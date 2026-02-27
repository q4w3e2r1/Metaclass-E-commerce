import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProducts } from "../../api/products";

export const useProducts = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    placeholderData: keepPreviousData,
  });
};