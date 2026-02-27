import React, { useMemo } from 'react';
import styles from './Text.module.scss';

export type TextProps = {
  className?: string;
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent';
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className = '',
  view,
  tag,
  weight,
  children,
  color,
  maxLines,
}) => {

  const Tag = tag ?? 'span';

  const classNames = useMemo(
    () =>
      [
        styles.text,
        view && styles[view],
        weight && styles[`weight-${weight}`],
        color && styles[`color-${color}`],
        maxLines && styles.maxLines,
        className,
      ]
        .filter(Boolean)
        .join(' '),
    [view, weight, color, maxLines, className, styles]
  );

  const style = maxLines
    ? { WebkitLineClamp: maxLines }
    : undefined;

  return <Tag className={classNames} style={style}>{children}</Tag>;
};

export default Text;