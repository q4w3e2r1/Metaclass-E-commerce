
import { useScrollRestoration } from '../../../hooks/useScrollRestor';
import styles from './Catalog.module.scss'
import CatalogHeader from './components/CatalogHeader';
import CatalogSearch from './components/CatalogSearch';
import ProductsList from './components/ProductsList';

export const CatalogPage = () => {

  useScrollRestoration();

  return (
    <div className={styles.wrap}>
      <div className={styles.root}>
        <CatalogHeader />
        <CatalogSearch />

        <ProductsList />
      </div>
    </div>
  )
};

export default CatalogPage;
