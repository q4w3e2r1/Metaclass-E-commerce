import { useQuery } from "@tanstack/react-query";
import { getProductCategories } from "../../api/productCategories";

export const useProductCategories = () => {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: getProductCategories,
    staleTime: 1000 * 60 * 10,
  });
};