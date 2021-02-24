import React, { useCallback } from 'react';
import './LoginPopup.css';
import Popup from './Popup.js';

function LoginPopup(props) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  function handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(values);
  }

  function handleClose() {
    resetForm({});
    props.onClose();
  }

  function handleRegisterRedirect() {
    resetForm({});
    props.onRegisterRedirect();
  }

  return (
    <Popup isOpened={props.isOpened} onClose={handleClose}>
      <form className="login-popup__form" name="login" onSubmit={handleSubmit} noValidate>
        <h2 className="login-popup__header">
          Вход
        </h2>
        <p className="login-popup__input-title">
          Email
        </p>
        <input
          className="login-popup__input"
          name="email"
          type="email"
          placeholder="Введите почту"
          value={values['email'] || ''}
          required
          onChange={handleChange}
        />
        <p className="login-popup__input-error">
          {errors['email']}
        </p>
        <p className="login-popup__input-title">
          Пароль
        </p>
        <input
          className="login-popup__input"
          name="password"
          type="password"
          placeholder="Введите пароль"
          value={values['password'] || ''}
          required
          minLength="6"
          onChange={handleChange}
        />
        <p className="login-popup__input-error">
          {errors['password']}
        </p>
        <p className="login-popup__error">
          {props.error}
        </p>
        <button
          className={`login-popup__submit${isValid ? '' : ' login-popup__submit_inactive'}`}
          type="submit">
          Войти
        </button>
        <p className="login-popup__hint">
          или
          <span className="login-popup__link" onClick={handleRegisterRedirect}>
            Зарегистрироваться
          </span>
        </p>
      </form>
  </Popup>
  );
}

export default LoginPopup;