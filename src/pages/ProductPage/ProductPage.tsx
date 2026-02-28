
import { useNavigate } from 'react-router-dom';
import { ArrowDownIcon } from '@components';
import styles from './ProductPage.module.scss'
import ProductCard from './components/ProductCard';
import { useScrollRestoration } from '@hooks/useScrollRestor';

export const ProductPage = () => {

  const navigate = useNavigate();
  useScrollRestoration()

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return(
  <div className={styles.productPage}>
    
    <div className={styles.product}>
      <div 
        className={styles.backward}
        onClick={handleBack}>
        <div className={styles.icon}><ArrowDownIcon /></div>
        Назад
      </div>
      <ProductCard />
      </div>
    </div>);
};

export default ProductPage;


