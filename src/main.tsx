import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routesConfig } from "./config/react-routes";
import { createBrowserRouter, RouterProvider } from "react-router";

import './styles/index.css'

const router = createBrowserRouter(routesConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
