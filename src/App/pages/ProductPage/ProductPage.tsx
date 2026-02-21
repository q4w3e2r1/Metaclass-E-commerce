
import { ArrowDownIcon } from '../../../components';
import styles from './ProductPage.module.scss'
import ProductCard from './components/ProductCard';

export const ProductPage = () => {
  return(
  <div className={styles.productPage}>
    
    <div className={styles.product}>
      <div className={styles.backward}>
        <div className={styles.icon}><ArrowDownIcon /></div>
        Назад
      </div>
      <ProductCard />

      </div>
    </div>);
};

export default ProductPage;


