import type { RouteObject } from "react-router";
import App from "../App";
import { Navigate } from "react-router";
import { routes } from "./routes";

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
  },
  {
    path: "*",
    element: <Navigate to={routes.main.mask} replace />,
  },
];