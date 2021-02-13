import React from 'react';
import closeIcon from '../images/close_icon.svg';
import './LoginPopup.css';

function LoginPopup(props) {
  return (
    <section className={`login-popup${props.isOpened ? ' login-popup_opened' : ''}`}>
      <div className="login-popup__container">
        <form className="login-form" name={props.name} onSubmit={props.onSubmit} noValidate>
          <h2 className="login-form__header">Вход</h2>
          <input
            className="login-form__input"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            className="login-form__input"
            name="password"
            type="password"
            placeholder="Пароль"
            required
          />   
          <button className="login-form__submit" type="submit">
            Войти
          </button>
          <p className="login-form__hint">
            Ещё не зарегистрированы? <a href="/">Зарегистрироваться</a>
          </p>
        </form>
        <button className="login-popup__close-button" onClick={props.onClose} type="button">
          <img src={closeIcon} alt="Закрыть"/>
        </button>
      </div>
    </section>
  );
}

export default LoginPopup;