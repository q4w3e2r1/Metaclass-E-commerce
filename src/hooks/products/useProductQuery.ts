import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../api/products";

export const useProduct = (documentId?: string) => {
  return useQuery({
    queryKey: ["product", documentId],
    queryFn: () => getProductById(documentId!),
    enabled: Boolean(documentId),
  });
};