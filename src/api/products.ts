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