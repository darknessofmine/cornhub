import React, { createContext } from 'react';


interface NotificationContext {
  isOpened: boolean,
  setIsOpened: (isVisible: boolean) => void,
  popupMesage: string,
  setPopupMesage: (message: string) => void,
}

interface Props {
  children: React.ReactNode,
}

const defaultNotificationContext: NotificationContext = {
  isOpened: false,
  setIsOpened: () => {},
  popupMesage: '',
  setPopupMesage: () => {},
}

export const NotificationPopupContext
  = createContext<NotificationContext>(defaultNotificationContext);


export const NotificationPopupProvider: React.FC<Props> = ({ children }) => {
  const [isOpened, setIsOpened] = React.useState<boolean>(false);
  const [popupMesage, setPopupMesage] = React.useState<string>('');

  const providerValue = React.useMemo(() => ({
    isOpened,
    setIsOpened,
    popupMesage,
    setPopupMesage,
  }), [isOpened, setIsOpened, popupMesage, setPopupMesage])

  return (
    <NotificationPopupContext.Provider value={providerValue}>
      {children}
    </NotificationPopupContext.Provider>
  );
}
