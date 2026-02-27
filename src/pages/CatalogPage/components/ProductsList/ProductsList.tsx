
import { Button, Card } from '@components'
import styles from './ProductsList.module.scss'
import { useProducts } from "@hooks/products/useProductsQuery";
import { Link } from "react-router-dom";

export const ProductsList = () => {

    const { data, isLoading } = useProducts(
        {
            pagination : {
                withCount: true,
                pageSize: 20
            }
        }
    );

    if (isLoading) return <div>Loading...</div>;

    const products = data?.items ?? [];


    return (
        <div className={styles.list}>

            <div className={styles.results}>
                <h2 className={styles.total}>Total products</h2>
                <div className={styles.amount}>{data?.total ?? 0}</div>
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
            <div className={styles.pagination}>Pagination</div>
        </div>
    )
}

export default ProductsList