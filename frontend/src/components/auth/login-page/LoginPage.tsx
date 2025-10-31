import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './LoginPage.module.css';
import { AuthFormContainer } from '../auth-form-container/AuthFormContainer';
import { ButtonSubmit } from '../button-confirm/ButtonSubmit';
import { ButtonText } from '../button-text/ButtonText';
import { FormInput } from '../form-input/FormInput';


export const LoginPage: React.FC = () => {
  const [loginForm, setLoginForm] = React.useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

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

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password', { state: { from: location.pathname } });
  };

  const handleSignUpButtonClick = () => {
    navigate('/signup', { state: { from: location.pathname } });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <AuthFormContainer
      heightOld={() => {
        switch (localStorage.getItem('lastVisitedPage')) {
          case '/signup':
            return styles.signupPageHeight;
          case '/forgot-password':
            return styles.forgotPasswordPageHeight;
          default:
            return null;
        }
      }}
      heightNew={styles.loginPageHeight}
    >
      <div className={styles.loginFormTitle}>Log in</div>
      <form
        id="loginForm"
        className={styles.loginForm}
        onSubmit={handleFormSubmit}
      >
        <div className={styles.loginFormContent} >
          <FormInput
            name='username'
            label='Username or email:'
            placeholder='enter your username or email'
            handleChange={handleFormChange}
          />
          <FormInput
            name='password'
            type='password'
            label='Password:'
            placeholder='enter your password'
            handleChange={handleFormChange}
          />
            <div className={styles.forgotPasswordButtonContainer} >
              <div
                className={styles.forgotPasswordButton}
                onClick={handleForgotPasswordClick}
              >
                forgot passowrd?
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
