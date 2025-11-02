import React, { type ChangeEvent, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './SignupPage.module.css';
import { AuthFormContainer } from '../auth-form-container/AuthFormContainer';
import { ButtonSubmit } from '../button-confirm/ButtonSubmit';
import { ButtonText } from '../button-text/ButtonText';
import { FormInput } from '../form-input/FormInput';

import { validateEmail } from '../../../utils/validationUtils';


interface SingupForm {
  email: string,
  username: string,
  password: string,
  passwordRepeat: string,
};
type PasswordTimeout = ReturnType<typeof setTimeout>;


export const SignupPage: React.FC = () => {
  const [isEmailValid, setIsEmailValid] = React.useState<boolean>(true);
  const [isUsernameValid, setIsUsernameValid] = React.useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState<boolean>(true);
  const [isPasswordRepeatValid, setIsPasswordRepeatValid] = React.useState<boolean>(true);
  
  const passwordTimeoutRef = React.useRef<PasswordTimeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [signupForm, setSignupForm] = React.useState<SingupForm>({
    email: '',
    username: '',
    password: '',
    passwordRepeat: '',
  });

  React.useEffect(() => {
    setIsPasswordRepeatValid(signupForm.password === signupForm.passwordRepeat);
  }, [signupForm.password, signupForm.passwordRepeat]);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleBackButtonClick = (): void => {
    navigate('/login', { state: { from: location.pathname} });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): () => void => {
    e.preventDefault();
    setIsEmailValid(true);
    setIsUsernameValid(true);
    setIsPasswordValid(true);

    const timeout = setTimeout(() => {
      if (!validateFormFields()) {
        return;
      }
      console.log('validation passed!');
    }, 10);
    return () => {
      clearTimeout(timeout);
      if (passwordTimeoutRef.current) {
        clearTimeout(passwordTimeoutRef.current);
      }
    };
  };

  const validateFormFields = (): boolean => {
    if (!validateEmail(signupForm.email)) {
      setIsEmailValid(false);
      return false;
    }
    if (!signupForm.username) {
      setIsUsernameValid(false);
      return false;
    }
    if (!signupForm.password) {
      setIsPasswordValid(false);
      return false;
    }

    const isRepeatValid = isPasswordRepeatValid;
    if (!isPasswordRepeatValid) {
      setIsPasswordRepeatValid(true);
      passwordTimeoutRef.current = setTimeout(() => {
        setIsPasswordRepeatValid(false);
        return false;
      }, 10);
    }
    return isRepeatValid;
  };

  return (
    <AuthFormContainer
      heightOld={() => {
        switch (localStorage.getItem('lastVisitedPage')) {
          case '/login':
            return styles.loginPageHeight;
          case '/forgot-password':
            return styles.forgotPasswordPageHeight;
          case '/forgot-password/verification':
            return styles.forgotPasswordVerificationPageHeight;
          default:
            return styles.signupPageHeight;
        }
      }}
      heightNew={styles.signupPageHeight}
    >
      <div className={styles.signupFormTitle}>Sign up</div>
      <form
        id="signupForm"
        className={styles.signupForm}
        onSubmit={handleFormSubmit}
      >
        <div className={styles.signupFormContent}>
          <FormInput
            name='email'
            label='Email:'
            placeholder='enter your email'
            isValid={isEmailValid}
            handleChange={handleFormChange}
          />
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
          <FormInput
            name='passwordRepeat'
            type='password'
            label='Repeat password:'
            placeholder='repeat your password'
            isValid={isPasswordRepeatValid}
            handleChange={handleFormChange}
          />

          <div className={
              `${styles.passwordsDontMatchNotificationContainer}
              ${isPasswordRepeatValid
                ? styles.notificationHidden
                : styles.notificationVisible}`
            }>
            <div className={styles.passwordsDontMatchNotification}>
              Passwords do not match!
            </div>
          </div>
        </div>

        <div className={styles.formFooterButtonsContainer}>
          <ButtonText buttonLabel='Back' handleClick={handleBackButtonClick}/>
          <ButtonSubmit buttonLabel='Sign up' forForm='signupForm'/>
        </div>
      </form>
    </AuthFormContainer>
  );
}
