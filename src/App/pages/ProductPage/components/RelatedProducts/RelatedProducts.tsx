

import { Link } from 'react-router-dom';
import { Button, Card } from '../../../../../components'
import { useProductsByCategory } from '../../../../../hooks/products/useProductsByCategory';
import styles from './RelatedProducts.module.scss'

type RelatedProductsProps = {
    categoryId: number, 
    excludeDocumentId: string
}



export const RelatedProducts = ({categoryId, excludeDocumentId}: RelatedProductsProps) => {

    const { data, isLoading } = useProductsByCategory(
        categoryId,
        excludeDocumentId
    );


    if (isLoading) return <div>Loading...</div>;

    const products = data?.items ?? [];

    return (
        <div className={styles.related}>
                <div className={styles.title}>Related items</div>
                <div className={styles.relatedProducts}>
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
                                contentSlot={
                                    <span>
                                    {product.price}
                                    </span>
                                }
                                actionSlot={
                                    <Button>Add to Card</Button>
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