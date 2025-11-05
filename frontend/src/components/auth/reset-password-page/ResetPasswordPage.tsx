import React, { type ChangeEvent, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './ResetPasswordPage.module.css';
import { AuthFormContainer } from '../auth-form-container/AuthFormContainer';
import { FormInput } from '../form-input/FormInput';
import { ButtonSubmit } from '../button-confirm/ButtonSubmit';
import { ButtonText } from '../button-text/ButtonText';


interface ResetPassword {
  password: string,
  passwordRepeat: string,
};
type PasswordTimeout = ReturnType<typeof setTimeout>;


export const ResetPasswordPage: React.FC = () => {
  const [isPasswordValid, setIsPasswordValid] = React.useState<boolean>(true);
  const [isPasswordRepeatValid, setIsPasswordRepeatValid] = React.useState<boolean>(true);

  const passwordTimeoutRef = React.useRef<PasswordTimeout | null>(null)
  const location = useLocation();
  const navigate = useNavigate();

  const [resetPasswordForm, setResetPasswordForm] = React.useState<ResetPassword>({
    password: '',
    passwordRepeat: '',
  })

  React.useEffect(() => {
    const redirectedFrom = location.state?.from;
    if (!redirectedFrom || !redirectedFrom.startsWith('/forgot-password/verification')) {
      localStorage.setItem('lastVisitedPage', localStorage.getItem('secondLastPage') || '');
      navigate('/forgot-password', { state: {} });
    }
  }, []);

  React.useEffect(() => {
    setIsPasswordRepeatValid(resetPasswordForm.password === resetPasswordForm.passwordRepeat)
  }, [resetPasswordForm.password, resetPasswordForm.passwordRepeat]);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setResetPasswordForm({
      ...resetPasswordForm,
      [e.target.name]: e.target.value,
    })
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): () => void => {
    e.preventDefault();
    setIsPasswordValid(true);

    const timeout = setTimeout(() => {
      if (!validateFormFields()) {
        return;
      }
      navigate('/login', { state: { from: location.pathname }, replace: true },)
    }, 10);
  
    return () => {
      clearTimeout(timeout);
      if (passwordTimeoutRef.current) {
        clearTimeout(passwordTimeoutRef.current);
      }
    }
  };

  const validateFormFields = (): boolean => {
    if (!resetPasswordForm.password) {
      setIsPasswordValid(false);
      return false;
    }

    const isRepeatValid = isPasswordRepeatValid;
    if (!isPasswordRepeatValid) {
      setIsPasswordRepeatValid(true)
      passwordTimeoutRef.current = setTimeout(() => {
        setIsPasswordRepeatValid(false);
        return false;
      }, 10);
    }
    return isRepeatValid;
  };

  const handleBackButtonClick = (): void => {
    navigate('/login', { state: { from: location.pathname } });
  };

  return (
    <AuthFormContainer defaultHeight={styles.resetPasswordPageHeight}>
      <div className={styles.resetPasswordTitle}>Reset password</div>
      <form
        id="loginForm"
        className={styles.resetPasswordForm}
        onSubmit={handleFormSubmit}
      >
        <div className={styles.resetPasswordFormContent} >
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
            notificationMessage='Passwords do not match'
            handleChange={handleFormChange}
          />
        </div>

        <div className={styles.formFooterButtonsContainer}>
          <ButtonText buttonLabel='Back to login' handleClick={handleBackButtonClick}/>
          <ButtonSubmit buttonLabel='Reset' forForm='loginForm'/>
        </div>
      </form>
    </AuthFormContainer>
  );
};
