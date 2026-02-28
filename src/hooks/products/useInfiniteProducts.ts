import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductsInfinite } from "../../api/products";

const PAGE_SIZE = 15;

export const useInfiniteProducts = (categories: string[]) => {
  return useInfiniteQuery({
    queryKey: ["products", "infinite", categories],
    queryFn: ({ pageParam = 1 }) =>
      getProductsInfinite({
        page: pageParam,
        pageSize: PAGE_SIZE,
        categories,
      }),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.pagination;

      if (page < pageCount) {
        return page + 1;
      }

      return undefined;
    },
  });
};