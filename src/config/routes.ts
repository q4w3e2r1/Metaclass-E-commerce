export const routes = {
  main: {
    mask: "/",
    create: () => "/",
  },
  products: {
    mask: "products/",
    create: () => "/products/",
  },
  product: {
    mask: "products/:productId",
    create: (id: string) => `/products/${id}`,
  },
};
