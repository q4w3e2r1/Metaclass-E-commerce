import { useRef, useCallback, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseInfiniteScrollProps {
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  totalPages?: number;
}

interface UseInfiniteScrollReturn {
  loaderRef: React.RefObject<HTMLDivElement | null>;
  observePage: (pageNumber: number) => (element: HTMLDivElement | null) => void;
  isRestoring: boolean;
  targetPageFromUrl: number;
  registerPageRef: (pageNumber: number, element: HTMLDivElement | null) => void;
  getPageRef: (pageNumber: number) => HTMLDivElement | undefined;
}

export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  totalPages = 0
}: UseInfiniteScrollProps): UseInfiniteScrollReturn => {
  
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const pageObserverRef = useRef<IntersectionObserver | null>(null);
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const isUpdatingUrl = useRef(false);
  const lastVisiblePageRef = useRef<number>(1);
  const isRestoringScroll = useRef(false);
  const loadedPagesCount = useRef(0);
  const isPageReload = useRef(true);
  const scrollTimeoutRef = useRef<number>(0);
  const restorationStartedRef = useRef(false);
  const restorationCompletedRef = useRef(false);

  const [isRestoring, setIsRestoring] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const targetPageFromUrl = Number(searchParams.get("page") || 1);

  // Сбрасываем флаг перезагрузки после первого рендера
  useEffect(() => {
    const timer = setTimeout(() => {
      isPageReload.current = false;
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Устанавливаем page=1 по умолчанию
  useEffect(() => {
  if (!searchParams.has("page") && totalPages > 0 && !isUpdatingUrl.current) {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      params.set("page", "1");
      return params;
    }, { 
      replace: true,
      state: { preventScrollReset: true }
    });
  }
  }, [searchParams, setSearchParams, totalPages]);

  // Функция для запуска восстановления скролла
  const startScrollRestoration = useCallback(() => {
    // Защита от повторного запуска
    if (restorationStartedRef.current || restorationCompletedRef.current) {
      return;
    }
    
    if (!targetPageFromUrl || targetPageFromUrl <= 1) return;
    if (isRestoringScroll.current) return;
    
    // Проверяем, загружена ли целевая страница
    const targetElement = pageRefs.current.get(targetPageFromUrl);
    
    if (targetElement) {
      
      restorationStartedRef.current = true;
      isRestoringScroll.current = true;
      setIsRestoring(true);

      let currentPage = 1;
      
      const scrollToNextPage = () => {
        if (currentPage < targetPageFromUrl) {
          const nextPageElement = pageRefs.current.get(currentPage + 1);
          
          if (nextPageElement) {
            
            nextPageElement.scrollIntoView({ 
              block: "start",
              behavior: "smooth"
            });
            
            currentPage++;
            
            // Очищаем предыдущий таймаут
            if (scrollTimeoutRef.current) {
              window.clearTimeout(scrollTimeoutRef.current);
            }
            
            scrollTimeoutRef.current = window.setTimeout(scrollToNextPage, 200);
          } else {
            scrollTimeoutRef.current = window.setTimeout(scrollToNextPage, 200);
          }
        } else {
          isRestoringScroll.current = false;
          setIsRestoring(false);
          lastVisiblePageRef.current = targetPageFromUrl;
          isPageReload.current = false;
          restorationCompletedRef.current = true;
          
          if (scrollTimeoutRef.current) {
            window.clearTimeout(scrollTimeoutRef.current);
          }
        }
      };

      const firstPageElement = pageRefs.current.get(1);
      if (firstPageElement && targetPageFromUrl > 1) {
        scrollToNextPage();
      } else {
        scrollTimeoutRef.current = window.setTimeout(startScrollRestoration, 100);
      }
    } else {
      
      // Если целевая страница еще не загружена, но все страницы до нее загружены
      if (targetPageFromUrl <= totalPages && totalPages > 0) {
        scrollTimeoutRef.current = window.setTimeout(startScrollRestoration, 100);
      }
    }
  }, [targetPageFromUrl, totalPages]);

  // Восстановление скролла после перезагрузки
  useEffect(() => {
    // Если восстановление уже завершено или запущено - не делаем ничего
    if (restorationCompletedRef.current || restorationStartedRef.current) return;
    if (!isPageReload.current || targetPageFromUrl <= 1) return;
    if (isRestoringScroll.current) return;

    const currentLoadedPages = totalPages;
    
    // Если целевая страница больше загруженной - загружаем следующую
    if (targetPageFromUrl > currentLoadedPages) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage?.();
      }
      return;
    }
    
    // Если целевая страница загружена - начинаем восстановление
    if (targetPageFromUrl <= currentLoadedPages) {
      // Даем время на отрисовку DOM
      scrollTimeoutRef.current = window.setTimeout(startScrollRestoration, 100);
    }
  }, [targetPageFromUrl, totalPages, hasNextPage, isFetchingNextPage, fetchNextPage, startScrollRestoration]);

  // Отслеживаем загрузку новых страниц
  useEffect(() => {
    // Если восстановление уже завершено - не делаем ничего
    if (restorationCompletedRef.current) return;
    if (!isPageReload.current) return;
    
    if (totalPages !== loadedPagesCount.current) {
      const previousCount = loadedPagesCount.current;
      loadedPagesCount.current = totalPages;
      
      
      // Если загрузилась новая страница и мы все еще в процессе восстановления
      if (isRestoringScroll.current && targetPageFromUrl > totalPages) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage?.();
        }
      }
      
      // Если целевая страница только что загрузилась и восстановление еще не начато
      if (targetPageFromUrl === totalPages && previousCount < totalPages && 
          !restorationStartedRef.current && !restorationCompletedRef.current) {
        scrollTimeoutRef.current = window.setTimeout(startScrollRestoration, 500);
      }
    }
  }, [totalPages, targetPageFromUrl, hasNextPage, isFetchingNextPage, fetchNextPage, startScrollRestoration]);

  // Дополнительная проверка: если все страницы загружены, но восстановление не началось
  useEffect(() => {
    // Если восстановление уже завершено или запущено - не делаем ничего
    if (restorationCompletedRef.current || restorationStartedRef.current) return;
    if (!isPageReload.current || targetPageFromUrl <= 1) return;
    if (isRestoringScroll.current) return;
    
    // Если целевая страница загружена, но восстановление не началось через 2 секунды
    if (targetPageFromUrl <= totalPages && totalPages > 0) {
      const timer = setTimeout(() => {
        if (!restorationStartedRef.current && !restorationCompletedRef.current) {
          console.log(`[Reload] Принудительный запуск восстановления`);
          startScrollRestoration();
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [targetPageFromUrl, totalPages, startScrollRestoration]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage && !isRestoringScroll.current) {
          fetchNextPage?.();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  const updatePageInUrl = useCallback((page: number) => {
  if (!page || page < 1) return;
  if (isUpdatingUrl.current || isRestoringScroll.current) return;

  isUpdatingUrl.current = true;
  
  setSearchParams(prev => {
    const params = new URLSearchParams(prev);
    const currentPage = Number(params.get("page") || 1);
    
    if (currentPage === page) {
      isUpdatingUrl.current = false;
      return prev; // ничего не меняем
    }
    
    params.set("page", String(page));
    return params;
    }, { 
      replace: true,
      state: { preventScrollReset: true }
    });
  
    setTimeout(() => {
      isUpdatingUrl.current = false;
    }, 100);

  }, [setSearchParams]);

  // Observer для страниц
const observePage = useCallback((pageNumber: number) => (element: HTMLDivElement | null) => {
  if (!element) {
    pageRefs.current.delete(pageNumber);
    return;
  }

  pageRefs.current.set(pageNumber, element);

  if (!pageObserverRef.current) {
    pageObserverRef.current = new IntersectionObserver(
      (entries) => {
        if (isRestoringScroll.current) return;

        // Используем throttle для уменьшения количества вызовов
        let timeoutId: number;
        
        requestAnimationFrame(() => {
          const visiblePages = entries
            .filter(entry => entry.isIntersecting)
            .map(entry => ({
              page: Number(entry.target.getAttribute("data-page")),
              ratio: entry.intersectionRatio,
              top: entry.boundingClientRect.top
            }))
            .sort((a, b) => a.page - b.page);

          if (visiblePages.length === 0) return;

          // Находим самую верхнюю видимую страницу
          const topmostPage = visiblePages.reduce((prev, current) => 
            (current.top < prev.top) ? current : prev
          );

          // Проверяем, видна ли страница 1 полностью вверху
          const pageOne = visiblePages.find(p => p.page === 1);
          if (pageOne && pageOne.ratio > 0.5 && pageOne.top >= -50) {
            if (lastVisiblePageRef.current !== 1) {
              lastVisiblePageRef.current = 1;
              // Добавляем небольшую задержку перед обновлением URL
              if (timeoutId) clearTimeout(timeoutId);
              timeoutId = window.setTimeout(() => {
                if (!isUpdatingUrl.current) {
                  updatePageInUrl(1);
                }
              }, 100);
            }
            return;
          }

          if (topmostPage.page !== lastVisiblePageRef.current) {
            lastVisiblePageRef.current = topmostPage.page;
            // Добавляем задержку перед обновлением URL
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
              if (!isUpdatingUrl.current) {
                updatePageInUrl(topmostPage.page);
              }
            }, 100);
          }
        });
      },
      {
        root: null,
        threshold: [0, 0.1, 0.5], // Добавляем больше порогов
        rootMargin: "0px",
      }
    );
  }

  pageObserverRef.current.observe(element);

  return () => {
    if (pageObserverRef.current && element) {
      pageObserverRef.current.unobserve(element);
    }
  };
}, [updatePageInUrl]);

  // Проверка видимости страницы 1
  useEffect(() => {
    let timeoutId: number;
    
    const checkPageOneVisibility = () => {
      if (isRestoringScroll.current) return;

      const pageOneElement = pageRefs.current.get(1);
      if (!pageOneElement) return;

      const rect = pageOneElement.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 100;

      if (isVisible && lastVisiblePageRef.current !== 1) {
        lastVisiblePageRef.current = 1;
        
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          updatePageInUrl(1);
        }, 100);
      }
    };

    window.addEventListener('scroll', checkPageOneVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkPageOneVisibility);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [updatePageInUrl]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (pageObserverRef.current) {
        pageObserverRef.current.disconnect();
      }
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const registerPageRef = useCallback((pageNumber: number, element: HTMLDivElement | null) => {
    if (element) {
      pageRefs.current.set(pageNumber, element);
    } else {
      pageRefs.current.delete(pageNumber);
    }
  }, []);

  const getPageRef = useCallback((pageNumber: number) => {
    return pageRefs.current.get(pageNumber);
  }, []);

  return {
    loaderRef,
    observePage,
    isRestoring,
    targetPageFromUrl,
    registerPageRef,
    getPageRef
  };
};