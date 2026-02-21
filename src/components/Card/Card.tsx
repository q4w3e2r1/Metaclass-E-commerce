import React, { useState } from 'react';
import Text from '../Text';
import styles from './Card.module.scss';

export type CardProps = {
  className?: string;
  image: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className = '',
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${styles.card} ${isHovered ? styles.hovered : ''} ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image}
        alt={`Картинка карточки ${title}`}
        className={styles.image}
      />

      <div className={styles.contentCard}>
        <div className={styles.contentText}>
          {captionSlot && (
            <Text view="p-14" tag="p" weight="medium" color="secondary">
              {captionSlot}
            </Text>
          )}
          <Text color="primary" weight="medium" maxLines={2} tag="p" view="p-20">
            {title}
          </Text>
          <Text color="secondary" weight="normal" maxLines={3} tag="p" view="p-16">
            {subtitle}
          </Text>
        </div>

        <div className={styles.footer}>
          <div className={styles.contentSlot}>{contentSlot}</div>
          {actionSlot && actionSlot}
        </div>
      </div>
    </div>
  );
};

export default Card;