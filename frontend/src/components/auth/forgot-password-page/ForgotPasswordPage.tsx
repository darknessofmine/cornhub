import React, { type ChangeEvent, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './ForgotPasswordPage.module.css';
import { AuthFormContainer } from '../auth-form-container/AuthFormContainer';
import { ButtonSubmit } from '../button-confirm/ButtonSubmit';
import { ButtonText } from '../button-text/ButtonText';
import { FormInput } from '../form-input/FormInput';


interface ForgotPasswordForm { email: string };


export const ForgotPasswordPage: React.FC = () => {
  const [forgotPasswordForm, setForgotPasswordForm] = React.useState<ForgotPasswordForm>({
    email: '',
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

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setForgotPasswordForm({
      ...forgotPasswordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const handleBackButtonClick = (): void => {
    navigate('/login', { state: { from: location.pathname } });
  };

  return (
    <AuthFormContainer
      heightOld={() => {
        switch (localStorage.getItem('lastVisitedPage')) {
          case '/login':
            return styles.loginPageHeight;
          case '/signup':
            return styles.signupPageHeight;
          case '/reset-password':
            return styles.resetPasswordPageHeight;
          default:
            return null;
        }
      }}
      heightNew={styles.forgotPasswordPageHeight}
    >
      <div className={styles.forgotPasswordFormTitle}>Send verification code</div>
      <form
        id="forgotPasswordForm"
        className={styles.forgotPasswordForm}
        onSubmit={handleFormSubmit}
      >
        <div className={styles.forgotPasswordFormContent} >
          <FormInput
            name='email'
            label='Email:'
            placeholder='enter your email'
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