import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductsInfinite } from "../../api/products";

const PAGE_SIZE = 9;

export const useInfiniteProducts = (categories: string[], search?: string, initialPage=1) => {
  return useInfiniteQuery({
    queryKey: ["products", "infinite", categories, search],
    queryFn: ({ pageParam = 1 }) =>
      getProductsInfinite({
        page: pageParam,
        pageSize: PAGE_SIZE,
        categories,
        search,
      }),
    initialPageParam: initialPage,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
  });
};