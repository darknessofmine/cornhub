import React from 'react';

import styles from './FormInput.module.css';


interface Props {
  name: string,
  type?: 'text' | 'password',
  label: string,
  value?: string,
  placeholder?: string,
  isValid?: boolean,
  notificationMessage?: string | undefined | null,
  autoComplete?: 'on' | 'off',
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};


export const FormInput: React.FC<Props> = ({
  name,
  type = 'text',
  label,
  value = undefined,
  placeholder = '',
  isValid = true,
  notificationMessage = null,
  autoComplete = 'on',
  handleChange,
}) => {
  const [isShaking, setIsShaking] = React.useState<boolean>(false);
  const [isNotificationVisible, setIsNotificationVisible] = React.useState<boolean>(false);
  const [invalidMessage, setInvalidMessage] = React.useState<string>('');

  React.useEffect(() => {
    if (!isValid) {
      setIsNotificationVisible(true);
      setIsShaking(true);

      const shakingTimeout = setTimeout(() => {
        setIsShaking(false);
      }, 300);
      return () => clearTimeout(shakingTimeout);
    } else {
      setIsNotificationVisible(false);
    }
  }, [isValid]);

  React.useEffect(() => {
    if (!notificationMessage) {
      setIsNotificationVisible(false);
      const fadeOutTimeout = setTimeout(() => {
        setInvalidMessage('')
      }, 300);
      return () => clearTimeout(fadeOutTimeout);
    } else {
      setInvalidMessage(notificationMessage);
    }
  }, [notificationMessage]);

  return (
    <div className={styles.inputFieldContainer}>
      <label htmlFor={name} className={styles.inputFieldLabel}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete={autoComplete}
        className={
          `${styles.inputField}
           ${isValid ? styles.validInputField : styles.invalidInputField}
           ${isShaking ? styles.shaking : ''}`
        }
      />
      {
      invalidMessage !== '' &&
      <div className={
        `${styles.notificationContainer}
         ${isNotificationVisible ? styles.notificationVisible : styles.notificationHidden}`
      }>
        <div className={styles.inputNotification}>
          {invalidMessage}
        </div>
      </div>
      }
    </div>
  );
}
