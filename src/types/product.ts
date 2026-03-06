

export interface ProductImage {
    id: number;
    documentId?: string;
    name: string;
    url: string;
    formats?: {
      small?: {
        url: string;
      };
      thumbnail?: {
        url: string;
      };
      medium?: {
        url: string;
      };
      large?: {
        url: string;
      };
    };
  }
  
  export interface ProductCategory {
    id: number;
    documentId?: string;
    title: string;
    description?: string;
  }

  export interface StrapiImage {
    url: string;
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      thumbnail?: { url: string };
    };
  }
  
  export interface Product {
    id: number;
    documentId: string;
    title: string;
    description: string;
    price: number;
    images: ProductImage[];
    productCategory?: ProductCategory;
    createdAt?: string;
    updatedAt?: string;
  }

  
  export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
  
  export interface StrapiResponse<T> {
    data: T[];
    meta: {
      pagination: Pagination;
    };
  }
  
  export interface RelatedProductsResponse {
    items: Product[];
    total: number;
    pagination: Pagination;
  }

  export interface StrapiSingleResponse<T> {
    data: T;
    meta: Record<string, unknown>;
  }

  export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
  }
  
  export interface Cart {
    items: CartItem[];
    total: number;
  }

  export interface UseCartReturn {
    cart: Cart | undefined;
    addToCart: (productId: number) => Promise<void>;
    removeFromCart: (productId: number) => Promise<void>;
    isLoading: boolean;
    isAdding: boolean;
    isRemoving: boolean;
    isProcessing: boolean;
  }

  export interface InfiniteProductsResponse {
    items: Product[];
    pagination: Pagination;
  }