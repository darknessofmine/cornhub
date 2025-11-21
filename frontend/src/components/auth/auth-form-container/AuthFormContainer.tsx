import React from 'react';
import { useLocation } from 'react-router-dom';

import styles from './AuthFormContainer.module.css';
import { NotificationPopup } from '../../common/notification-popup/NotificationPopup';
import { NotificationPopupContext } from '../../../contexts/NotificationPopupContext';


interface Props {
  defaultHeight: string,
  children: React.ReactNode,
};


export const AuthFormContainer: React.FC<Props> = ({ defaultHeight, children }) => {
  const [containerHeight, setContainerHeight] = React.useState((): string => {
    const lastVisitedPage = localStorage.getItem('lastVisitedPage');
    if (lastVisitedPage === '/login') return styles.loginPageHeight;
    if (lastVisitedPage === '/signup') return styles.signupPageHeight;
    if (lastVisitedPage === '/forgot-password') return styles.forgotPasswordPageHeight;
    if (lastVisitedPage?.startsWith('/reset-password')) return styles.resetPasswordPageHeight;
    if (lastVisitedPage?.startsWith('/forgot-password/verification')) {
      return styles.forgotPasswordVerificationPageHeight;
    }
    if (lastVisitedPage === '/error-page') return styles.errorPageHeight;
    return defaultHeight;
  });
  const notificationContext = React.useContext(NotificationPopupContext);
  const location = useLocation();

  React.useEffect(() => {
    localStorage.setItem('secondLastPage', localStorage.getItem('lastVisitedPage') || '');
    localStorage.setItem('lastVisitedPage', location.pathname);
    notificationContext.setIsOpened(false);
  }, [location.pathname]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setContainerHeight(defaultHeight);
    }, 10);
    return () => clearTimeout(timeout);
  }, [defaultHeight]);

  return (
    <main>
      <div className={styles.authFormPageContainer}>
        <div className={`${styles.authFormContainer} ${containerHeight}`}>
          <div className={styles.authFormHeader}>
            CORN
            <div className={styles.headerSecondPart}>HUB</div>
          </div>

          <div className={styles.formContentContainer}>
            {children}
          </div>
        </div>
      </div>

      <NotificationPopup/>
    </main>
  );
}
