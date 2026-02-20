export const routes = {
  main: {
    mask: "/",
    create: () => "/",
  },
  products: {
    mask: "products",
    create: () => "/products",
  },
  product: {
    mask: "products/:id",
    create: (id: string) => `/products/${id}`,
  },
};
