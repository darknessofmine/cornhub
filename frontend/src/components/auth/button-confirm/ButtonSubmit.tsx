import type React from 'react';

import styles from './ButtonSubmit.module.css';


interface Props {
  buttonLabel: string;
  forForm: string;
};


export const ButtonSubmit: React.FC<Props> = ({buttonLabel, forForm}) => {
  return (
    <div className={styles.buttonContainer}>
      <button type='submit' form={forForm} className={styles.buttonSubmit}>
        {buttonLabel}
      </button>
    </div>
  );
}
