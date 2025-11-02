import React from 'react';

import styles from './FormInput.module.css';


interface Props {
  name: string,
  type?: 'text' | 'password',
  label: string,
  value?: string,
  placeholder?: string,
  isValid?: boolean,
  autoComplete?: 'on' | 'off',
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};


export const FormInput: React.FC<Props> = ({
  name,
  type = 'text',
  label,
  value = null,
  placeholder = '',
  isValid = true,
  autoComplete = 'on',
  handleChange,
}) => {
  const [isShaking, setIsShaking] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isValid) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  }, [isValid]);

  return (
    <div className={styles.inputFieldContainer}>
      <label htmlFor={name} className={styles.inputFieldLabel}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value || undefined}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete={autoComplete}
        className={
          `${styles.inputField}
           ${isValid ? styles.validInputField : styles.invalidInputField}
           ${isShaking ? styles.shaking : ''}`
        }
      />
    </div>
  );
}
