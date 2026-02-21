import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollPositions = new Map<string, number>();

export const useScrollRestoration = () => {
  const location = useLocation();
  const path = location.pathname;

  const isCatalogPage = path === "/products";

  useEffect(() => {
    if (isCatalogPage) {
      // Restore scroll for catalog
      const savedPosition = scrollPositions.get(path);

      if (savedPosition !== undefined) {
        window.scrollTo(0, savedPosition);
      }
    } else {
      // Detail pages → always scroll top
      window.scrollTo(0, 0);

      // Clear scroll memory for detail pages
      scrollPositions.delete(path);
    }

    return () => {
      if (isCatalogPage) {
        scrollPositions.set(path, window.scrollY);
      }
    };
  }, [path, isCatalogPage]);
};