
import styles from './Catalog.module.scss'

export const CatalogPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>Products</div>
        <div className={styles.description}>
            We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </div>
      </div>




      
      <div className={styles.total}>Total products <span>184</span></div>
      <div className={styles.listCards}>
        <div className={styles.card}>Card</div>

      </div>
    </div>
  )
};

export default CatalogPage;
