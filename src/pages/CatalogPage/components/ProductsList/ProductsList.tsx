import { Card, CartButton, ProductCardSkeleton } from '@components'
import styles from './ProductsList.module.scss'
import { useInfiniteProducts } from "@hooks/products/useInfiniteProducts";
import { useSearchParams, Link } from "react-router-dom";
import { useMemo, Fragment } from 'react';
import { useCart } from '@/hooks/cart/useCartQuery';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { routes } from '@config/routes'

const SKELETON_COUNT = 6;
const SKELETON_ITEMS = Array.from({ length: SKELETON_COUNT }, (_, i) => i);

export const ProductsList = () => {
  const { cart } = useCart();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const categoryIds = useMemo(() => {
    return searchParams.get("categories")?.split(",").filter(Boolean) ?? [];
  }, [searchParams]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteProducts(categoryIds, search);

  const totalPages = data?.pages.length ?? 0;

  const {
    loaderRef,
    observePage,
  } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    totalPages
  });

  const total = data?.pages?.[0]?.pagination?.total ?? 0;

  const cartProductIds = useMemo(() => {
    if (!cart) return new Set<number>();
    return new Set(cart.map((item) => item.product.id));
  }, [cart]);


  if (isLoading) {
    return (
      <div className={styles.list}>
        <div className={styles.listCards}>
          {SKELETON_ITEMS.map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.list}>

      <div className={styles.results}>
        <h2 className={styles.total}>Total products</h2>
        <div className={styles.amount}>{total}</div>
      </div>

      <div className={styles.listCards}>
        {data?.pages.map((page, pageIndex) => {
          const pageNumber = pageIndex + 1;
          
          return (
            <Fragment key={pageIndex}>
              <div
                data-page={pageNumber}
                ref={observePage(pageNumber)}
                className={styles.pageAnchor}
                aria-hidden="true"
              />

              {page.items.map((product) => {
                const imageUrl =
                  product.images?.[0]?.formats?.small?.url ||
                  product.images?.[0]?.url ||
                  "";

                const isInCart = cartProductIds.has(product.id);

                return (
                  <Link
                    key={product.documentId}
                    to={routes.product.getRoute(product.documentId)}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Card
                      image={imageUrl}
                      title={product.title}
                      subtitle={product.description}
                      contentSlot={<span>{product.price}</span>}
                      actionSlot={
                        <CartButton 
                        productId={product.id}
                        isInCart={isInCart}
                    />
                      }
                    />
                  </Link>
                );
              })}
            </Fragment>
          );
        })}
      </div>

      {hasNextPage && (
        <div ref={loaderRef} className={styles.loader}/>
      )}
    </div>
  );
};

export default ProductsList;