
import styles from './CatalogHeader.module.scss'

export const CatalogHeader = () => {
    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>Products</h1>
                <div className={styles.description}>
                    We display products based on the latest products we have, if you want
                to see our old products please enter the name of the item
                </div>
            </div>
        </>
    )
}

export default CatalogHeader