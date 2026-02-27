import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollPositions = new Map<string, number>();

export const useScrollRestoration = () => {
  const location = useLocation();
  const path = location.pathname;

  const isCatalogPage = path === "/products/";

  useEffect(() => {
    if (isCatalogPage) {
      const savedPosition = scrollPositions.get(path);

      if (savedPosition !== undefined) {
        window.scrollTo(0, savedPosition);
      }
    } else {
      window.scrollTo(0, 0);

      scrollPositions.delete(path);
    }

    return () => {
      if (isCatalogPage) {
        scrollPositions.set(path, window.scrollY);
      }
    };
  }, [path, isCatalogPage]);
};