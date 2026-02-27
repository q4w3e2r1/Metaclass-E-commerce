import { useQuery } from "@tanstack/react-query";
import { getRelatedProductsByCategory } from "../../api/products";

export const useRelatedProductsByCategory = (
    categoryId: number,
    excludeDocumentId?: string
  ) => {
    return useQuery({
      queryKey: ["products", "category", categoryId, excludeDocumentId],
      queryFn: () =>
        getRelatedProductsByCategory(categoryId, excludeDocumentId),
      enabled: Boolean(categoryId),
    });
  };