import React, { type ChangeEvent, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './SignupPage.module.css';
import { AuthFormContainer } from '../auth-form-container/AuthFormContainer';
import { ButtonSubmit } from '../button-confirm/ButtonSubmit';
import { ButtonText } from '../button-text/ButtonText';
import { FormInput } from '../form-input/FormInput';


interface SingupForm {
  email: string;
  username: string;
  password: string;
  passwordRepeat: string,
}


export const SignupPage: React.FC = () => {
  const [signupForm, setSignupForm] = React.useState<SingupForm>({
    email: '',
    username: '',
    password: '',
    passwordRepeat: '',
  })

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
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    })
  } 

  const handleBackButtonClick = (): void => {
    navigate(
      '/login',
      { state: { from: location.pathname} },
    )
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <AuthFormContainer
      heightOld={() => {
        switch (location.state?.from) {
          case '/login':
            return styles.loginPageHeight
          case '/password-reset':
            return styles.resetPageHeight
          default:
            return null
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
        <div className={styles.signupFormContent} >
          <FormInput
            name='email'
            label='Email:'
            placeholder='enter your email'
            handleChange={handleFormChange}
          />
          <FormInput
            name='username'
            label='Username:'
            placeholder='enter your username'
            handleChange={handleFormChange}
          />
          <FormInput
            name='password'
            type='password'
            label='Password:'
            placeholder='enter your password'
            handleChange={handleFormChange}
          />
          <FormInput
            name='passwordRepeat'
            type='password'
            label='Repeat password:'
            placeholder='repeat your password'
            handleChange={handleFormChange}
          />
        </div>

        <div className={styles.formFooterButtonsContainer}>
          <ButtonText buttonLabel='Back' handleClick={handleBackButtonClick}/>
          <ButtonSubmit buttonLabel='Sign up' forForm='signupForm'/>
        </div>
      </form>
    </AuthFormContainer>
  );
}
