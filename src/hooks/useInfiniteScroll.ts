import { useRef, useEffect, useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface UseInfiniteScrollProps {
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  totalPages?: number;
}

interface UseInfiniteScrollReturn {
  loaderRef: React.RefObject<HTMLDivElement | null>;
  observePage: (pageNumber: number) => (el: HTMLDivElement | null) => void;
  isRestoring: boolean;
  targetPageFromUrl: number;
}

export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  totalPages = 0,
}: UseInfiniteScrollProps): UseInfiniteScrollReturn => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const pageObserverRef = useRef<IntersectionObserver | null>(null);
  const lastPageRef = useRef(1);
  const initialRestoreDoneRef = useRef(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [isRestoring, setIsRestoring] = useState(false);

  const targetPageFromUrl = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = Number(params.get("page"));
    return raw && raw > 1 ? raw : 1;
  }, [searchParams]);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !isRestoring
        ) {
          fetchNextPage?.();
        }
      },
      {
        rootMargin: "300px",
      }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, isRestoring]);


  useEffect(() => {
    if (targetPageFromUrl <= 1) return;

    if (targetPageFromUrl > totalPages) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage?.();
      }
      return;
    }

    const el = pageRefs.current.get(targetPageFromUrl);
    if (!el) return;

    setIsRestoring(true);

    el.scrollIntoView({
      behavior: "auto",
      block: "start",
    });

    const completeRestoration = () => {
      lastPageRef.current = targetPageFromUrl;
      
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set("page", String(targetPageFromUrl));
      
      setSearchParams(currentParams, {
        replace: true,
        state: { preventScrollReset: true },
      });
      
      setIsRestoring(false);
      initialRestoreDoneRef.current = true;
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(completeRestoration);
    });
  }, [
    targetPageFromUrl,
    totalPages,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    setSearchParams,
  ]);

  const updateUrlPage = useCallback(
    (page: number) => {
      if (lastPageRef.current === page) return;
  
      lastPageRef.current = page;
  
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set("page", String(page));
  
      setSearchParams(currentParams, {
        replace: true,
        state: { preventScrollReset: true },
      });
    },
    [setSearchParams]
  );

  const observePage = useCallback(
    (pageNumber: number) => (el: HTMLDivElement | null) => {
      if (!el) {
        pageRefs.current.delete(pageNumber);
        return;
      }

      pageRefs.current.set(pageNumber, el);

      if (!pageObserverRef.current) {
        pageObserverRef.current = new IntersectionObserver(
          (entries) => {
            if (isRestoring) return;

            const visible = entries
              .map((entry) => ({
                page: Number(entry.target.getAttribute("data-page")),
                top: entry.boundingClientRect.top,
              }))
              .filter((e) => e.top <= 120)
              .sort((a, b) => Math.abs(a.top) - Math.abs(b.top));

            if (visible.length > 0) {
              updateUrlPage(visible[0].page);
            }
          },
          {
            threshold: 0,
          }
        );
      }

      pageObserverRef.current.observe(el);
    },
    [updateUrlPage, isRestoring]
  );

  useEffect(() => {
    if (targetPageFromUrl > 1 && !initialRestoreDoneRef.current) {
      const params = new URLSearchParams(window.location.search);
      const currentPageInUrl = params.get("page");
      
      if (currentPageInUrl !== String(targetPageFromUrl)) {
        params.set("page", String(targetPageFromUrl));
        setSearchParams(params, {
          replace: true,
          state: { preventScrollReset: true },
        });
      }
    }
  }, [targetPageFromUrl, setSearchParams]);

  useEffect(() => {
    return () => {
      pageObserverRef.current?.disconnect();
    };
  }, []);

  return {
    loaderRef,
    observePage,
    isRestoring,
    targetPageFromUrl,
  };
};