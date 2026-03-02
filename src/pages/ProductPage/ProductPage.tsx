import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowDownIcon } from '@components';
import styles from './ProductPage.module.scss'
import ProductCard from './components/ProductCard';
import { useLayoutEffect } from 'react';

export const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };


  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);

  

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