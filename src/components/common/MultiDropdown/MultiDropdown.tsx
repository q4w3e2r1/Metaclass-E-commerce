import React from 'react';
import Input from '../Input';
import ArrowDownIcon from '../ArrowDownIcon';
import styles from './MultiDropdown.module.scss';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
  placeholder?: string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className = '',
  options,
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const hasSelectedOptions = value.length > 0;
  const titleText = getTitle(value);

  const isOptionSelected = (option: Option): boolean =>
    value.some((selected) => selected.key === option.key);

  const handleToggleDropdown = () => {
    if (disabled) return;
    setIsOpen(true);
  };

  const handleOptionClick = (option: Option) => {
    const selected = isOptionSelected(option);

    if (selected) {
      onChange(value.filter((v) => v.key !== option.key));
    } else {
      onChange([...value, option]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setSearch('');
    }
  };

  React.useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(search.toLowerCase())
  );

  const inputValue = isOpen
    ? search
    : hasSelectedOptions
    ? titleText
    : '';

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      onClick={handleToggleDropdown}
    >
      <Input
        value={inputValue}
        onChange={(value: string) => {
          if (!isOpen) return;
          setSearch(value);
        }}
        afterSlot={<ArrowDownIcon color="secondary" />}
        disabled={disabled}
        placeholder={!hasSelectedOptions ? titleText : undefined}
      />

      {isOpen && !disabled && (
        <div className={styles.dropdown}>
          {filteredOptions.map((option) => {
            const selected = isOptionSelected(option);

            return (
              <div
                key={option.key}
                onClick={() => handleOptionClick(option)}
                className={`${styles.option} ${
                  selected ? styles.selected : ''
                }`}
              >
                {option.value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;