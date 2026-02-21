
import { Button, Card } from '../../../../../components';
import styles from './ProductCard.module.scss'

export const ProductCard = () => {

    return(
        <div className={styles.card}>
            <div className={styles.main}>
                <img src="/Rectangle 23.png" alt="" />
                <div className={styles.content}>
                    <div className={styles.title}>White Aesthetic Chair</div>
                    <div className={styles.description}>Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support</div>
                    <div className={styles.price}>$99.98</div>
                    <div className={styles.buttons}>
                        <Button>Buy now</Button>
                        <Button>Add to Cart</Button>
                    </div>
                </div>
            </div>

            <div className={styles.related}>
                <div className={styles.tytle}>Related items</div>
                <div className={styles.relatedProducts}>
                <Card image='/Rectangle 23.png' title='Заголовок карточки' subtitle='ОписаниеОписаниеОписаниеОписаниеОписание'></Card>
                <Card image='/Rectangle 23.png' title='Заголовок карточки' subtitle='ОписаниеОписаниеОписаниеОписаниеОписание'></Card>
                <Card image='/Rectangle 23.png' title='Заголовок карточки' subtitle='ОписаниеОписаниеОписаниеОписаниеОписание'></Card>

                </div>
            </div>
        </div>
    )
}

export default ProductCard;