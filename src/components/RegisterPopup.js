import React from 'react';
import './RegisterPopup.css';
import Popup from './Popup.js';

function RegisterPopup(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onRegister({ email, password, name });
  }

  return (
    <Popup
      header="Регистрация"
      isOpened={props.isOpened}
      onClose={props.onClose}
      >
      <form className="register-form" name={props.name} onSubmit={handleSubmit} noValidate>
        <input
          className="register-form__input"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={handleEmailChange}
        />
        <input
          className="register-form__input"
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          required
          onChange={handlePasswordChange}
        />
        <input
          className="register-form__input"
          name="name"
          type="text"
          placeholder="Введите свое имя"
          value={name}
          required
          onChange={handleNameChange}
        />   
        <button className="register-form__submit" type="submit">
          Зарегистрироваться
        </button>
        <p className="register-form__hint">
          или
          <span className="register-form__redirect" onClick={props.onLoginRedirect}>Войти</span>
        </p>
      </form>
  </Popup>
  );
}

export default RegisterPopup;