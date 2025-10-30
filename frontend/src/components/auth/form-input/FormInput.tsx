import React from 'react';

import styles from './FormInput.module.css';


interface Props {
  name: string;
  type?: 'text' | 'password';
  label: string;
  placeholder?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
};


export const FormInput: React.FC<Props> = ({
  name,
  type='text',
  label,
  placeholder='',
  handleChange,
}) => {
  return (
    <div className={styles.inputFieldContainer} >
      <label htmlFor={name} className={styles.inputFieldLabel} >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className={styles.inputField}
      />
    </div>
  );
}
