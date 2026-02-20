import type { RouteObject } from "react-router";
import App from "../App";
import { Navigate } from "react-router";
import { routes } from "./routes";
import CatalogPage from "../App/pages/CatalogPage";
import ProductPage from "../App/pages/ProductPage";

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        index: true,
        element: <CatalogPage />,
      },
      {
        path: routes.product.mask,
        element: <ProductPage />,
      },
      {
        path: routes.products.mask,
        element: <CatalogPage />,
      }
    ],
  },
  {
    path: "*",
    element: <Navigate to={routes.main.mask} replace />,
  },
];