

import { Link } from 'react-router-dom';
import { Button, Card, CartButton } from '@components'
import { useRelatedProductsByCategory } from '@hooks/products/useRelatedProductsByCategoryQuery';
import styles from './RelatedProducts.module.scss'
import { useCart } from '@/hooks/cart/useCartQuery';
import { useMemo } from 'react';
import type { Product } from '@/types/product';

type RelatedProductsProps = {
    categoryId: number, 
    excludeDocumentId: string
}



export const RelatedProducts = ({categoryId, excludeDocumentId}: RelatedProductsProps) => {

    const { data, isLoading } = useRelatedProductsByCategory(
        categoryId,
        excludeDocumentId
    );
    const { cart } = useCart();

    const cartProductIds = useMemo(() => {
        if (!Array.isArray(cart)) return new Set<number>();
        return new Set(cart.map((item: any) => item.product.id));
      }, [cart]);


    if (isLoading) return <div>Loading...</div>;

    const products = data?.items ?? [];

    return (
        <div className={styles.related}>
                <div className={styles.title}>Related items</div>
                <div className={styles.relatedProducts}>
                {products.map((product: Product)=> {
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
                                key={product.documentId}
                                image={imageUrl}
                                title={product.title}
                                subtitle={product.description}
                                contentSlot={
                                    <span>
                                    {product.price}
                                    </span>
                                }
                                actionSlot={
                                    <CartButton productId={product.id} isInCart={isInCart}  />
                                }
                            />
                        </Link>
                    )
                })}
                </div>
            </div>
    )
}

export default RelatedProducts