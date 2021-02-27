import React from 'react';
import './RegisterInfoPopup.css';
import Popup from './Popup.js';

function RegisterInfoPopup(props) {
  return (
    <Popup isOpened={props.isOpened} onClose={props.onClose}>
      <h2 className="register-info-popup__header">
        Пользователь успешно зарегистрирован!
      </h2>
      <p className="register-info-popup__link" onClick={props.onLoginRedirect}>
        Войти
      </p>
    </Popup>
  );
}

export default RegisterInfoPopup;