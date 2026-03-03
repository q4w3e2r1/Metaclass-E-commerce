
import React from 'react';
import styles from './ProductCardSkeleton.module.scss';

interface ProductCardSkeletonProps {
  className?: string;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ className }) => {
  return (
    <div className={`${styles.skeletonCard} ${className || ''}`}>
      <div className={styles.imageSkeleton} />
      
      <div className={styles.contentCard}>
        <div className={styles.contentText}>
          <div className={styles.captionSkeleton} />

          <div className={styles.titleSkeleton} />
          
          <div className={styles.descriptionContainer}>
            <div className={styles.descriptionLine} />
            <div className={styles.descriptionLine} />
            <div className={styles.descriptionLine} />
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.contentSlotSkeleton} />
          
          <div className={styles.buttonSkeleton} />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;