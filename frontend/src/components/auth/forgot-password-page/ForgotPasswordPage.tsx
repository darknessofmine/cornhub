import React, { type ChangeEvent, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './ForgotPasswordPage.module.css';
import { AuthFormContainer } from '../auth-form-container/AuthFormContainer';
import { ButtonSubmit } from '../button-confirm/ButtonSubmit';
import { ButtonText } from '../button-text/ButtonText';
import { FormInput } from '../form-input/FormInput';

import { validateEmail, validateInputField } from '../../../utils/validationUtils';


interface ForgotPasswordForm { email: string };


export const ForgotPasswordPage: React.FC = () => {
  const [isEmailValid, setIsEmailValid] = React.useState<boolean>(true);
  const [emailFieldMesasge, setEmailFieldMessage] = React.useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  const [forgotPasswordForm, setForgotPasswordForm] = React.useState<ForgotPasswordForm>({
    email: '',
  });

  React.useEffect(() => {
    if (
      validateInputField(forgotPasswordForm.email) &&
      !(validateEmail(forgotPasswordForm.email))
    ) {
      setEmailFieldMessage('Invalid email');
      setIsEmailValid(false);
    } else {
      setEmailFieldMessage('');
      setIsEmailValid(true);
    }
  }, [forgotPasswordForm.email]);
  
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setForgotPasswordForm({
      ...forgotPasswordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): () => void => {
    e.preventDefault();
    setIsEmailValid(true);

    const timeout = setTimeout(() => {
      if (!validateInputField(forgotPasswordForm.email)) {
        setEmailFieldMessage('');
        setIsEmailValid(false);
        return;
      }

      if (!validateEmail(forgotPasswordForm.email)) {
        setEmailFieldMessage('Invalid email')
        setIsEmailValid(false);
        return;
      }
      localStorage.removeItem('newCodeTimerStarted');
      navigate('/forgot-password/verification', { state: { from: location.pathname } });
    }, 10);
    return () => clearTimeout(timeout);
  };

  const handleBackButtonClick = (): void => {
    navigate('/login', { state: { from: location.pathname } });
  };

  return (
    <AuthFormContainer defaultHeight={styles.forgotPasswordPageHeight}>
      <div className={styles.forgotPasswordFormTitle}>Forgot password?</div>
      <form
        id="forgotPasswordForm"
        className={styles.forgotPasswordForm}
        onSubmit={handleFormSubmit}
      >
        <div className={styles.forgotPasswordFormContent}>
          <FormInput
            name='email'
            label='Email:'
            placeholder='enter your email'
            isValid={isEmailValid}
            notificationMessage={emailFieldMesasge}
            handleChange={handleFormChange}
          />
        </div>

        <div className={styles.formFooterButtonsContainer}>
          <ButtonText buttonLabel='Back' handleClick={handleBackButtonClick}/>
          <ButtonSubmit buttonLabel='Send code' forForm='forgotPasswordForm'/>
        </div>
      </form>
    </AuthFormContainer>
  );
}
