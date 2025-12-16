import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './NavMenu.module.css'
import MenuIconGreen from '../../assets/menu-icon-green.png'

import { MenuOtption } from './menu-option/MenuOption';


export const NavMenu: React.FC = () => {
  const [isMenuOpened, setIsMenuOpened] = React.useState<boolean>(false);
  const [isOpened, setIsOpened] = React.useState<boolean>(false);

  const menuRef = React.useRef<HTMLDivElement>(null);
  const menuButtonRef = React.useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  React.useEffect(() => {console.log('init');
  }, []);

  React.useEffect(() => {
    
    if (isMenuOpened) {
        setIsOpened(true);
    } else {
      const closeTimeout = setTimeout(() => {
        setIsOpened(false);
      }, 180);
      return () => clearTimeout(closeTimeout);
    }
  }, [isMenuOpened])

  const handleMenuOpen = (): void => {
    setIsMenuOpened(true);
  };

  const handleMenuButtonClick = (e: React.MouseEvent): void => {
    if (
      !menuRef.current?.contains(e.target as Node) ||
      menuButtonRef.current?.contains(e.target as Node)
    ) {
      setIsMenuOpened(!isMenuOpened);
    }
  };
  
  return (
    <>
      <div className={styles.menuHeaderContainer}>
        <div className={styles.menuButtonContainer} onClick={handleMenuOpen}>
          <img src={MenuIconGreen} width={45} height={45}/>
        </div>

        <div className={styles.authFormHeader}>
          CORN
          <div className={styles.headerSecondPart}>HUB</div>
        </div>
      </div>

      {isOpened &&
        <div
          onClick={handleMenuButtonClick}
          className={`
            ${styles.menuOverlay}
            ${isMenuOpened ? styles.darkBackgound : styles.lightBackground}
          `}
        >
          <div
            ref={menuRef}
            className={`
              ${styles.menuContainer}
              ${isMenuOpened ? styles.menuSlideIn : styles.menuSlideOut}
            `}
          >
            <div className={`${styles.menuHeaderContainer} ${styles.stickyHeader}`}>
              <div
                ref={menuButtonRef}
                className={styles.menuButtonContainer}
                onClick={handleMenuOpen}>
                <img src={MenuIconGreen} width={45} height={45}/>
              </div>

              <div className={styles.authFormHeader}>
                CORN
                <div className={styles.headerSecondPart}>HUB</div>
              </div>
            </div>

            <nav className={styles.navMenu}>
              <MenuOtption
                label={'Home page'}
                selected={location.pathname === '/'}
                onClick={() => navigate('/')}
              />
              <MenuOtption
                label={'Defects page'}
                selected={location.pathname === '/defects'}
                onClick={() => navigate('/defects')}
              />
              <MenuOtption
                label={'Another page'}
                selected={location.pathname === '/*'}
                onClick={() => navigate('/*')}
              />

            </nav>
          </div>
        </div>
      }
    </>
  );
}