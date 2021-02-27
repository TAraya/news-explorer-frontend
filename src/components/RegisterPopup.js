import React, { useCallback } from 'react';
import './RegisterPopup.css';
import Popup from './Popup.js';

function RegisterPopup(props) {
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

  React.useEffect(() => {
    resetForm();
  // eslint-disable-next-line
  }, [props.isOpened]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(values);
  }

  function handleClose() {
    resetForm({});
    props.onClose();
  }

  function handleLoginRedirect() {
    resetForm({});
    props.onLoginRedirect();
  }

  return (
    <Popup isOpened={props.isOpened} isLocked={props.isLocked} onClose={handleClose}>
      <form className="register-popup__form" name="register" onSubmit={handleSubmit} noValidate>
        <h2 className="register-popup__header">
          Регистрация
        </h2>
        <p className="register-popup__input-title">
          Email
        </p>
        <input
          className="register-popup__input"
          name="email"
          type="email"
          placeholder="Введите почту"
          value={values['email'] || ''}
          required
          readOnly={props.isLocked}
          onChange={handleChange}
        />
        <p className="register-popup__input-error">
          {errors['email']}
        </p>
        <p className="register-popup__input-title">
          Пароль
        </p>
        <input
          className="register-popup__input"
          name="password"
          type="password"
          placeholder="Введите пароль"
          value={values['password'] || ''}
          required
          readOnly={props.isLocked}
          minLength="6"
          onChange={handleChange}
        />
        <p className="register-popup__input-error">
          {errors['password']}
        </p>
        <p className="register-popup__input-title">
          Имя
        </p>
        <input
          className="register-popup__input"
          name="name"
          type="text"
          placeholder="Введите свое имя"
          value={values['name'] || ''}
          required
          readOnly={props.isLocked}
          minLength="2"
          maxLength="30"
          onChange={handleChange}
        />
        <p className="register-popup__input-error">
          {errors['name']}
        </p>
        <p className="register-popup__error">
          {props.error}
        </p>
        <button
          className={`register-popup__submit${isValid ? '' : ' register-popup__submit_inactive'}`}
          type="submit"
          disabled={props.isLocked}
          >
          Зарегистрироваться
        </button>
        <p className="register-popup__hint">
          или
          <span className="register-popup__link" onClick={handleLoginRedirect}>
            Войти
          </span>
        </p>
      </form>
  </Popup>
  );
}

export default RegisterPopup;