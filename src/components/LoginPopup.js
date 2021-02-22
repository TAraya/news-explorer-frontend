import React from 'react';
import './LoginPopup.css';
import Popup from './Popup.js';

function LoginPopup(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onLogin({ email, password });
  }

  return (
    <Popup
      header="Вход"
      isOpened={props.isOpened}
      onClose={props.onClose}
      >
      <form className="login-form" name="login" onSubmit={handleSubmit} noValidate>
        <input
          className="login-form__input"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={handleEmailChange}
        />
        <input
          className="login-form__input"
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          required
          onChange={handlePasswordChange}
        />   
        <button className="login-form__submit" type="submit">
          Войти
        </button>
        <p className="login-form__hint">
          Ещё не зарегистрированы?
          <span className="login-form__redirect" onClick={props.onRegisterRedirect}>Зарегистрироваться</span>
        </p>
      </form>
  </Popup>
  );
}

export default LoginPopup;