import type React from 'react';

import styles from './ButtonText.module.css'


interface Props {
  buttonLabel: string;
  handleClick: () => void;
};


export const ButtonText: React.FC<Props> = ({buttonLabel, handleClick}) => {
  return (
    <div className={styles.buttonContainer} >
      <button type='button' className={styles.buttonText} onClick={handleClick}>
        {buttonLabel}
      </button>
    </div>
  )
} 