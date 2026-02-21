import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../../api/products";

export const useProductsByCategory = (
    categoryId?: number,
    excludeDocumentId?: string
  ) => {
    return useQuery({
      queryKey: ["products", "category", categoryId, excludeDocumentId],
      queryFn: () =>
        getProductsByCategory(categoryId!, excludeDocumentId),
      enabled: Boolean(categoryId),
    });
  };