
import { Button, Card } from '@components'
import styles from './ProductsList.module.scss'
import { useInfiniteProducts } from "@hooks/products/useInfiniteProducts";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef } from 'react';
import { useCart } from '@/hooks/cart/useCartQuery';

export const ProductsList = () => {

    const loaderRef = useRef<HTMLDivElement | null>(null);
    const { cart, addToCart, removeFromCart } = useCart();
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const categoryIds = useMemo(() => {
      return searchParams.get("categories")?.split(",") ?? [];
    }, [searchParams]);

    const observerRef = useRef<IntersectionObserver | null>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
      } = useInfiniteProducts(categoryIds, search);

    useEffect(() => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        {
          root: null,
          rootMargin: "200px",
          threshold: 0,
        }
      );
    
      if (loaderRef.current) {
        observerRef.current.observe(loaderRef.current);
      }
    
      return () => {
        observerRef.current?.disconnect();
      };
    }, [hasNextPage, fetchNextPage]);


    const products =
    data?.pages.flatMap((page) => page.items) ?? [];

    const total = data?.pages?.[0]?.pagination?.total ?? 0;

    const cartProductIds = useMemo(() => {
      if (!Array.isArray(cart)) return new Set<number>();
      return new Set(cart.map((item: any) => item.product.id));
    }, [cart]);


    if (isLoading) return <div>Loading...</div>;
    return (
        <div className={styles.list}>

            <div className={styles.results}>
                <h2 className={styles.total}>Total products</h2>
                <div className={styles.amount}>{total ?? 0}</div>
            </div>
            <div className={styles.listCards}>
                {products.map((product: any)=> {
                    
                  const imageUrl =
                  product.images?.[0]?.formats?.small?.url ||
                  product.images?.[0]?.url ||
                  "";

                  const isInCart = cartProductIds.has(product.id);

                  return (
                      <Link
                      key={product.documentId}
                      to={`/products/${product.documentId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      >
                          <Card
                              image={imageUrl}
                              title={product.title}
                              subtitle={product.description}
                              contentSlot={<span>{product.price}</span>}
                              actionSlot={
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    if (isInCart) {
                                      removeFromCart(product.id);
                                    } else {
                                      addToCart(product.id);
                                    }
                                  }}
                                >
                                  {isInCart ? "Delete from Cart" : "Add to Cart"}
                                </Button>}
                          />
                      </Link>
                  )
                })}
            </div>
            
            {hasNextPage && (
                <div ref={loaderRef} className={styles.loader}>
                    {isFetchingNextPage ? "Loading..." : "Scroll to load more"}
                </div>
      )}
        </div>
    )
}

export default ProductsList