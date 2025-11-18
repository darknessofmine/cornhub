import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './PageNotFound.module.css'
import { ButtonText } from '../../auth/button-text/ButtonText';
import { AuthFormContainer } from '../../auth/auth-form-container/AuthFormContainer';


export const PageNotFound: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    setIsLoggedIn(false);

    localStorage.setItem('lastVisitedPage', '/error-page')
  }, []);

  const handleReturnButtonClick = (): void => {
    switch (isLoggedIn) {
      case true:
        navigate('/', { state: {} });
        break;
      case false:
        navigate('/login', { state: {} });
        break;
    }
  };

  return (
    <AuthFormContainer defaultHeight={styles.pageNotFoundHeight}>
      <div className={styles.pageNotFoundFormContainer}>
        <div className={styles.pageNotFoundQuestionContainer}>?</div>
        <div className={styles.pageNotFoundContent}>

          <div className={styles.pageNotFoundTextContent}>
            <p className={styles.pageNotFoundErrorCode}>{'404'}</p>
            <p className={styles.pageNotFoundMessage}>
              {"Suddenly, page you are looking for doesn't exist :("}
            </p>
          </div>

          <div className={styles.pageNotFoundReturnButton}>
              <ButtonText
                buttonLabel={isLoggedIn ? 'Return to home page' : 'Return to Login page'}
                handleClick={handleReturnButtonClick}
              />
          </div>
        </div>
      </div>
    </AuthFormContainer>
  )
}
