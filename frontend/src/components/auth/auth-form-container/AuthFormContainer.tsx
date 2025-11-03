import React from 'react';
import { useLocation } from 'react-router-dom';

import styles from './AuthFormContainer.module.css';
import { NotificationPopup } from '../../common/notification-popup/NotificationPopup';
import { NotificationPopupContext } from '../../../context/NotificationPopupContext';


interface Props {
  heightOld?: (() => string | undefined | null) | string | null,
  heightNew: string,
};
type PropsWithChildren = React.PropsWithChildren<Props>;


export const AuthFormContainer: React.FC<PropsWithChildren> = ({
  heightOld = null,
  heightNew,
  children ,
}) => {
  const [containerHeight, setContainerHeight] = React.useState(heightOld || heightNew);
  const notificationContext = React.useContext(NotificationPopupContext)
  const location = useLocation();

  React.useEffect(() => {
    localStorage.setItem('secondLastPage', localStorage.getItem('lastVisitedPage') || '');
    localStorage.setItem('lastVisitedPage', location.pathname);
    notificationContext.setIsOpened(false);
  }, [location.pathname]);

  React.useEffect(() => {
    if (!heightOld) return;

    const timeout = setTimeout(() => {
      setContainerHeight(heightNew);
    }, 10);
    return () => clearTimeout(timeout);
  }, [heightOld, heightNew]);

  return (
    <main>
      <div className={styles.authFormPageContainer}>
        <div className={`${styles.authFormContainer} ${containerHeight}`}>
          <div className={styles.authFormHeader}>
              CORN
              <div className={styles.headerSecondPart} >HUB</div>
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
