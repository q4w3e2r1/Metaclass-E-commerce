
import { Button, Card } from '@components'
import styles from './ProductsList.module.scss'
import { useInfiniteProducts } from "@hooks/products/useInfiniteProducts";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef } from 'react';

export const ProductsList = () => {

    const loaderRef = useRef<HTMLDivElement | null>(null);

    const [searchParams] = useSearchParams();
    const categoryIds = useMemo(() => {
      return searchParams.get("categories")?.split(",") ?? [];
    }, [searchParams]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
      } = useInfiniteProducts(categoryIds);

    useEffect(() => {
        const observer = new IntersectionObserver(
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
          observer.observe(loaderRef.current);
        }
    
        return () => observer.disconnect();
      }, [hasNextPage, fetchNextPage]);



    if (isLoading) return <div>Loading...</div>;


    const products =
    data?.pages.flatMap((page) => page.items) ?? [];

    const total = data?.pages?.[0]?.pagination?.total ?? 0;


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

                    return (
                        <Link
                        key={product.documentId}
                        to={`/products/${product.documentId}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Card
                                key={product.documentId}
                                image={imageUrl}
                                title={product.title}
                                subtitle={product.description}
                                contentSlot={<span>{product.price}</span>}
                                actionSlot={<Button>Add to Card</Button>}
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