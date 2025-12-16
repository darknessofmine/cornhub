import React from 'react';

import styles from './NotificationPopup.module.css';
import CheckMark from '../../../../src/assets/green-check-mark.png'
import { NotificationPopupContext } from '../../../contexts/NotificationPopupContext';


export const NotificationPopup: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = React.useState<boolean>(false);
  const context = React.useContext(NotificationPopupContext);

  React.useEffect(() => {
    if (context.isOpened) {
      setIsPopupVisible(true);
    } else {
      const bounceOutTimeout = setTimeout(() => {
        setIsPopupVisible(false);
      }, 400);
      return () => clearTimeout(bounceOutTimeout);
    }
  }, [context.isOpened]);

  const handlePopupBounceOut = () => {
    context.setIsOpened(false);
  };

  return (
    <>
      {
        isPopupVisible &&
        <div className={
          `${styles.notificationPopupContainer}
           ${context.isOpened ? styles.popupBounceIn : styles.popupBounceOut}`
        }
          onClick={handlePopupBounceOut}
        >
          <div className={styles.notificationPopupContent}>
            <div className={styles.imageContainer}>
              <img src={CheckMark}/>
            </div>
            
            <div className={styles.textContainer}>
              {context.popupMesage}
            </div>
          </div>
        </div>
      }
    </>
  );
}