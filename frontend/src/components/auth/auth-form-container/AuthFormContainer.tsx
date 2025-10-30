import React from 'react';

import styles from './AuthFormContainer.module.css'


interface Props {
  heightOld?: string | null;
  heightNew: string;
};

type PropsWithChildren = React.PropsWithChildren<Props> 


export const AuthFormContainer: React.FC<PropsWithChildren> = ({
  heightOld = null,
  heightNew,
  children,
}) => {
  const [containerHeight, setContainerHeight] = React.useState(heightOld || heightNew);

  React.useEffect(() => {
    if (!heightOld) return

    const timer = setTimeout(() => {
      setContainerHeight(heightNew);
    }, 10);
    return () => clearTimeout(timer)
  }, []);

  return (
    <main>
      <div className={styles.authFormPageContainer} >
        <div className={`
          ${styles.authFormContainer} 
          ${containerHeight}
        `} >
          <div className={styles.authFormHeader} >
              CORN
              <div className={styles.headerSecondPart} >HUB</div>
            </div>
          <div className={styles.formContentContainer}>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
