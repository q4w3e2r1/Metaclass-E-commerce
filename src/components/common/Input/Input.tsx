import React from 'react';
import styles from './Input.module.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, disabled, className = '', ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };

    return (
      <div className={`${styles.wrapper} ${className}`}>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`${styles.input} ${
            afterSlot ? styles.withSlot : ''
          }`}
          {...props}
        />
        {afterSlot && (
          <div className={styles.afterSlot}>
            {afterSlot}
          </div>
        )}
      </div>
    );
  }
);

export default Input;