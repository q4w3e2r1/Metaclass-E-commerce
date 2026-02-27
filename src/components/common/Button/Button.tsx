import React from 'react';
import Loader from '../Loader';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  className = '',
  disabled,
  style,
  ...props
}) => {
  const isDisabled = loading || disabled;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`${styles.button} ${className}`}
    >
      {loading && <Loader size="s" className="ChangeColor" />}
      {children}
    </button>
  );
};

export default Button;