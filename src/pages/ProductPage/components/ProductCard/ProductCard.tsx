
import { useParams } from 'react-router-dom';
import { useProduct } from '@hooks/products/useProductQuery';
import { Button, CartButton } from '@components';
import styles from './ProductCard.module.scss'
import RelatedProducts from '../RelatedProducts';
import { useMemo } from 'react';
import { useCart } from '@/hooks/cart/useCartQuery';

export const ProductCard = () => {

    const { productId } = useParams();

    const { data, isLoading } = useProduct(productId);
    const { cart} = useCart();


    const cartProductIds = useMemo(() => {
        if (!Array.isArray(cart)) return new Set<number>();
        return new Set(cart.map((item: any) => item.product.id));
      }, [cart]);

    if (isLoading) return <div>Loading...</div>;

    const isInCart = cartProductIds.has(data.id);


    const imageUrl =
    data.images?.[0]?.formats?.large?.url ||
    data.images?.[0]?.url ||
    "";

    return(
        <div className={styles.card}>
            <div className={styles.main}>
                <img src={imageUrl} alt="" />
                <div className={styles.content}>
                    <div className={styles.title}>{data.title}</div>
                    <div className={styles.description}>{data.description}</div>
                    <div className={styles.price}>${data.price}</div>
                    <div className={styles.buttons}>
                        <Button>Buy now</Button>
                        <CartButton 
                            productId={data.id}
                            isInCart={isInCart}
                        />
                    </div>
                </div>
            </div>

            <RelatedProducts categoryId={data.productCategory.id} excludeDocumentId={data.documentId}/>
        </div>
    )
}

export default ProductCard;