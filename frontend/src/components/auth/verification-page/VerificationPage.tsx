import React, { type ChangeEvent, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './VerificationPage.module.css';
import { AuthFormContainer } from '../auth-form-container/AuthFormContainer';
import { ButtonText } from '../button-text/ButtonText';
import { ButtonSubmit } from '../button-confirm/ButtonSubmit';
import { FormInput } from '../form-input/FormInput';


export const VerificationPage: React.FC = () => {
  const [verificationCodeField, setVerificationCodeField] = React.useState<string>('');
  const [isVerificationValid, setIsVerificationValid] = React.useState<boolean>(true);
  
  const [isSendButtonActive, setIsSendButtonActive] = React.useState<boolean>(false);
  const [sendTimer, setSendTimer] = React.useState<number>(60);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const redirectedFrom = location.state?.from;
    if (
      typeof redirectedFrom !== 'string' ||
      redirectedFrom !== '/forgot-password'
    ) {
      localStorage.setItem('lastVisitedPage', localStorage.getItem('secondLastPage') || '');
      navigate('/forgot-password', { state: {}, replace: true });
    }
  }, []);

  React.useEffect(() => {
    const timerStarted = localStorage.getItem('newCodeTimerStarted');
    if (!timerStarted) {
      localStorage.setItem('newCodeTimerStarted', new Date().getTime().toString());
    } else {
      const secondsPassed = Math.floor((new Date().getTime() - Number(timerStarted)) / 1000);
      if (secondsPassed < 60) {
        setSendTimer(60 - secondsPassed);
      } else {
        setIsSendButtonActive(true);
      }
    }
  }, []);

  React.useEffect(() => {
    if (!isSendButtonActive) {
      const sendInterval = setInterval(() => {
        setSendTimer(sendTimer - 1);
        if (sendTimer === 1) {
          setIsSendButtonActive(true);
          setSendTimer(60);
          return;
        }
      }, 1000);
      return () => clearInterval(sendInterval);
    }
  }, [isSendButtonActive, sendTimer]);
 
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setVerificationCodeField(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): () => void => {
    e.preventDefault();
    setIsVerificationValid(true);

    const validationTimeout = setTimeout(() => {
      if (validateVerificationCodeField()) {
        navigate(
          `/reset-password/${crypto.randomUUID()}`,
          {state: { from: location.pathname }},
        );
      }
    }, 10);
    return () => clearTimeout(validationTimeout);
  };

  const validateVerificationCodeField = (): boolean => {
    if (!verificationCodeField || verificationCodeField.length !== 4) {
      setIsVerificationValid(false);
      return false;
    }
    return true;
  }

  const handleNewCodeButtonClick = (): void => {
    setIsSendButtonActive(false);
    setSendTimer(60);
    localStorage.setItem('newCodeTimerStarted', new Date().getTime().toString());
  };

  const handleBackButtonClick = (): void => {
    navigate('/forgot-password', { state: { from: location.pathname } });
  };

  return (
    <AuthFormContainer defaultHeight={styles.forgotPasswordVerificationPageHeight}>
      <div className={styles.verificationFormTitle} >Verification</div>
      <form
        id="verificationForm"
        className={styles.verificationForm}
        onSubmit={handleFormSubmit}
      >
        <div className={styles.verificationFormContent}>
          <div className={styles.verificationNotation}>
            Verification code has been sent to you, please check your email.
          </div>

          <FormInput
            name='verificationCode'
            label='Verification code:'
            placeholder='enter your verification code'
            isValid={isVerificationValid}
            autoComplete='off'
            handleChange={handleFormChange}
          />
          <div className={styles.newCodeButtonContainer}>
            {
              isSendButtonActive
              ? <div className={styles.newCodeButton} onClick={handleNewCodeButtonClick}>
                  Send new verification code
                </div>
              : <div className={styles.newCodeTimer}>
                  New code will be available in: {sendTimer}s
                </div>
            }
          </div>
        </div>

        <div className={styles.formFooterButtonsContainer}>
          <ButtonText buttonLabel='Back' handleClick={handleBackButtonClick}/>
          <ButtonSubmit buttonLabel='Confirm' forForm='verificationForm'/>
        </div>
      </form>
    </AuthFormContainer>
  );
}
