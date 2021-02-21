import React from 'react';
import './RegisterPopup.css';
import Popup from './Popup.js';

function RegisterPopup(props) {
  return (
    <Popup
      header="Пользователь успешно зарегистрирован!"
      isOpened={props.isOpened}
      onClose={props.onClose}
      >
      <p className="register-form__hint">
        <span onClick={props.onLoginRedirect}>Войти</span>
      </p>
  </Popup>
  );
}

export default RegisterPopup;