
import { Card } from '../../../../../components'
import styles from './ProductsList.module.scss'

export const ProductsList = () => {
    return (
        <div className={styles.list}>
            <div className={styles.results}>
                <h2 className={styles.total}>Total products</h2>
                <div className={styles.amount}>184</div>
            </div>
            <div className={styles.listCards}>
                <Card image='/Rectangle 23.png' title='Заголовок карточки' subtitle='ОписаниеОписаниеОписаниеОписаниеОписание'></Card>
                <Card image='/Rectangle 23.png' title='Заголовок карточки' subtitle='ОписаниеОписаниеОписаниеОписаниеОписание'></Card>
                <Card image='/Rectangle 23.png' title='Заголовок карточки' subtitle='ОписаниеОписаниеОписаниеОписаниеОписание'></Card>
                <Card image='/Rectangle 23.png' title='Заголовок карточки' subtitle='ОписаниеОписаниеОписаниеОписаниеОписание'></Card>
                <Card image='/Rectangle 23.png' title='Заголовок карточки' subtitle='ОписаниеОписаниеОписаниеОписаниеОписание'></Card>
                <Card image='/Rectangle 23.png' title='Заголовок карточки' subtitle='ОписаниеОписаниеОписаниеОписаниеОписание'></Card>
            </div>

            <div className={styles.pagination}>Pagination</div>
        </div>
    )
}

export default ProductsList