import React from 'react';

function Login({ makeRegistrationButton, onLoginButton, isLoading, changePreloaderStatus }) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });

  React.useEffect(() => {
    makeRegistrationButton();
    //eslint-disable-next-line
  }, []);

  function handleChange(evt) {
    const {name, value} = evt.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!formValue.email || !formValue.password){
      return;
    };

    changePreloaderStatus();
    onLoginButton(formValue);
  };

  return (
    <div className="user-form">
      <div className="user-form__container">
        <form name="login" className="user-form__form" onSubmit={handleSubmit} noValidate>
          <fieldset className="user-form__input-container">
            <h1 className="user-form__title">Вход</h1>
            <label htmlFor="email-input" className="user-form__input-field">
              <input id="email-input" type="email" className="user-form__input user-form__input_type_email" placeholder="Email" name="email" value={formValue.email} minLength="2" maxLength="40" required onChange={handleChange} />
              <span className="email-input-error user-form__input-error"></span>
            </label>
            <label htmlFor="password-input" className="user-form__input-field">
              <input id="password-input" type="password" className="user-form__input user-form__input_type_password" placeholder="Пароль" name="password" value={formValue.password} minLength="2" maxLength="40" required onChange={handleChange} autoComplete="off" />
              <span className="password-input-error user-form__input-error"></span>
            </label>
            <button type="submit" className="user-form__save-button">{isLoading ? "Вход..." : "Войти"}</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
