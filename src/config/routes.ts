export const routes = {
  main: {
    mask: "/",
    getRoute: () => "/",
  },
  products: {
    mask: "/products/",
    getRoute: () => "/products/",
  },
  product: {
    mask: "/products/:productId",
    getRoute: (id: string | number) => `/products/${id}`,
  },
};