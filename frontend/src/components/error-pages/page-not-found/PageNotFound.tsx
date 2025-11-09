import React from 'react';

import styles from './PageNotFound.module.css'
import { ButtonText } from '../../auth/button-text/ButtonText';


export const PageNotFound: React.FC = () => {
  return (
    <div className={styles.pageNotFoundContainer}>
      <div className={styles.pageNotFoundFormContainer}>
        <div className={styles.pageNotFoundQuestionContainer}>
          ?
        </div>
        <div className={styles.pageNotFoundContent}>

          <div className={styles.pageNotFoundTextContainer}>
            <p className={styles.pageNotFoundErrorCode}>{'404'}</p>
            <p className={styles.pageNotFoundTextContent}>
              {"Suddenly, page you are looking for doesn't exist :("}
            </p>

          </div>

          <div className={styles.pageNotFoundReturnButton}>
            <ButtonText buttonLabel='Return to Login page' handleClick={() => {}}/>
          </div>
        </div>
      </div>
    </div>
  )
}
