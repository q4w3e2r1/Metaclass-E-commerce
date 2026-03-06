

import styles from './Catalog.module.scss'
import CatalogHeader from './components/CatalogHeader';
import CatalogSearch from './components/CatalogSearch';
import ProductsList from './components/ProductsList';

export const CatalogPage = () => {

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
