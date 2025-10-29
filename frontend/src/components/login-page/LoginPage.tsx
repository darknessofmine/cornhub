import React from 'react';

import styles from './LoginPage.module.css'


export const LoginPage: React.FC = () => {
  const [loginForm, setLoginForm] = React.useState({
    username: '',
    password: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  }

  const handleForgotPasswordClick = () => {};

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main>
      <div className={styles.loginPageContainer} >
        <div className={styles.loginFormContainer} >
          <form
            id="loginForm"
            className={styles.loginForm}
            onSubmit={handleFormSubmit}
          >
            <div className={styles.loginFormTitle} >
              CORN
              <div className={styles.titleSecondPart} >HUB</div>
            </div>

            <div className={styles.loginFormContent} >
              <div className={styles.usernameFieldContainer} >
                <input
                  type="text"
                  name="username"
                  className={styles.usernameField}
                  placeholder="username"
                  onChange={handleFormChange}
                />
              </div>

              <div className={styles.passwordFieldContainer} >
                <input
                  type="password"
                  name="password"
                  className={styles.passwordField}
                  placeholder="password"
                  onChange={handleFormChange}
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
            </div>

            <div className={styles.enterButtonContainer}>
              <button type="submit" form="loginForm">
                Enter
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
