import React from 'react';

import styles from './NotificationPopup.module.css';
import checkMark from '../../../../src/assets/green-check-mark.png'
import { NotificationPopupContext } from '../../../context/NotificationPopupContext';


export const NotificationPopup: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = React.useState<boolean>(false);
  const context = React.useContext(NotificationPopupContext);

  React.useEffect(() => {
    if (context.isOpened) {
      setIsPopupVisible(true);
    } else {
      const bounceOutTimeout1 = setTimeout(() => {
        setIsPopupVisible(false);
      }, 400);
      return () => clearTimeout(bounceOutTimeout1);
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
              <img src={checkMark}/>
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