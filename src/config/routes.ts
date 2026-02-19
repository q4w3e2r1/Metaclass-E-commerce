export const routes = {
    main: {
      mask: "/",
      create: () => "/",
    },
    users: {
      mask: "/users",
      create: () => "/users",
    },
    user: {
      mask: "/users/:id",
      create: (id: string) => `/users/${id}`,
    },
  }