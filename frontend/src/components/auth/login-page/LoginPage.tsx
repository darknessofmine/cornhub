import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './LoginPage.module.css';
import { AuthFormContainer } from '../auth-form-container/AuthFormContainer';
import { ButtonSubmit } from '../button-confirm/ButtonSubmit';
import { ButtonText } from '../button-text/ButtonText';
import { FormInput } from '../form-input/FormInput';
import { NotificationPopupContext } from '../../../context/NotificationPopupContext';


export const LoginPage: React.FC = () => {
  const [isUsernameValid, setIsUsernameValid] = React.useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState<boolean>(true);
  
  const notificationContext = React.useContext(NotificationPopupContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [loginForm, setLoginForm] = React.useState({
    username: '',
    password: '',
  });

  React.useEffect(() => {
    const redirectedFrom = location.state?.from;
    if (redirectedFrom?.startsWith('/reset-password')) {
      notificationContext.setPopupMesage('Your password has been changed');
      notificationContext.setIsOpened(true);
    }
  }, []);

  React.useEffect(() => {
    if (location.state?.from) {
      navigate(
        location.pathname,
        { replace: true, state: {} },
      );
    }
  }, [navigate]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotPasswordClick = (): void => {
    navigate('/forgot-password', { state: { from: location.pathname } });
  };

  const handleSignUpButtonClick = (): void => {
    navigate('/signup', { state: { from: location.pathname } });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): () => void => {
    e.preventDefault();
    setIsUsernameValid(true);
    setIsPasswordValid(true);
    
    const timeout = setTimeout(() => {
      if (!validateFormFields()) {
        return;
      }
      console.log('Validation passed');
    }, 10);
    return () => clearTimeout(timeout);
  };

  const validateFormFields = (): boolean => {
    if (!loginForm.username) {
      setIsUsernameValid(false);
      return false;
    }
    if (!loginForm.password) {
      setIsPasswordValid(false);
      return false;
    }
    return true;
  };

  return (
    <AuthFormContainer defaultHeight={styles.loginPageHeight}>
      <div className={styles.loginFormTitle}>Log in</div>
      <form
        id="loginForm"
        className={styles.loginForm}
        onSubmit={handleFormSubmit}
      >
        <div className={styles.loginFormContent} >
          <FormInput
            name='username'
            label='Username:'
            placeholder='enter your username'
            isValid={isUsernameValid}
            handleChange={handleFormChange}
          />
          <FormInput
            name='password'
            type='password'
            label='Password:'
            placeholder='enter your password'
            isValid={isPasswordValid}
            handleChange={handleFormChange}
          />
            <div className={styles.forgotPasswordButtonContainer} >
              <div
                className={styles.forgotPasswordButton}
                onClick={handleForgotPasswordClick}
              >
                forgot password?
              </div>
            </div>
        </div>

        <div className={styles.formFooterButtonsContainer}>
          <ButtonText buttonLabel='Sign up' handleClick={handleSignUpButtonClick}/>
          <ButtonSubmit buttonLabel='Log in' forForm='loginForm'/>
        </div>
      </form>
    </AuthFormContainer>
  );
}
