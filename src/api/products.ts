import { api } from "./axios";
import { buildQuery } from "./queryBuilder";
import type { StrapiResponse } from "../types/api";

export interface ProductsQueryParams {
  sort?: string;
  fields?: string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    withCount?: boolean;
    start?: number;
    limit?: number;
  };
}

export const getProducts = async (
  params?: ProductsQueryParams
) => {
  const query = buildQuery({
    populate: ["images", "productCategory"],
    ...params,
  });

  const { data } = await api.get<StrapiResponse<any>>(
    `/products?${query}`
  );

  return {
    items: data.data,
    total: data.meta?.pagination?.total ?? 0,
    pagination: data.meta?.pagination,
  };
};

export const getProductById = async (documentId: string) => {
  const query = buildQuery({
    populate: ["images", "productCategory"],
  });

  const { data } = await api.get<StrapiResponse<any>>(
    `/products/${documentId}?${query}`
  );

  return data.data;
};


export const getRelatedProductsByCategory = async (
  categoryId: number,
  excludeDocumentId?: string
) => {

  const query = buildQuery({
    populate: ["images", "productCategory"],
    filters: {
      productCategory: {
        id: {
          $eq: categoryId,
        },
      },
      ...(excludeDocumentId && {
        documentId: {
          $ne: excludeDocumentId,
        },
      }),
    },
  });

  const { data } = await api.get<StrapiResponse<any>>(
    `/products?${query}`
  );

  return {
    items: data.data,
    total: data.meta?.pagination?.total ?? 0,
    pagination: data.meta?.pagination,
  };
};

type GetInfiniteProductsParams = {
  page: number;
  pageSize: number;
  categories?: string[];
  search?: string;
};

export const getProductsInfinite = async ({
  page,
  pageSize,
  categories,
  search,
}: GetInfiniteProductsParams) => {

  const filters: Record<string, any> = {};
  
  if (categories && categories.length > 0) {
    filters.productCategory = {
      id: {
        $in: categories,
      },
    };
  }

  if (search && search.trim().length > 0) {
    filters.title = {
      $containsi: search.trim(),
    };
  }

  const query = buildQuery({
    populate: ["images", "productCategory"],
    pagination: {
      page,
      pageSize,
      withCount: true,
    },
    ...(Object.keys(filters).length > 0 && { filters }),
  });

  const { data } = await api.get(
    `/products?${query}`
  );

  return {
    items: data.data,
    pagination: data.meta?.pagination,
  };
};