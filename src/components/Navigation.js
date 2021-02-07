import React from 'react';
import './Navigation.css';
import closeIcon from '../images/close_icon.svg';
import logoutIcon from '../images/logout_icon.svg';

function Navigation(props) {
  return (
    <section className={`navigation${props.isOpened ? ' navigation_opened' : ''}`}>
      <div className="navigation__container">
        <h2 className="navigation__title">NewsExplorer</h2>
        <button className="navigation__close-button" onClick={props.onClose}>
            <img className="navigation__close-icon" src={closeIcon} alt="Закрыть" />
        </button>
        <div className="navigation__links">
          <a className="navigation__link" href="/">
            Главная
          </a>
          {
            // props.loggedIn &&
            <a className="navigation__link" href="/saved-news">
              Сохраненные статьи
            </a>
          }
          {
            props.loggedIn ?
            <button className="navigation__button">
              Гретта
              <img className="navigation__button-icon" src={logoutIcon} alt="Выход" />
            </button> :
            <button className="navigation__button" onClick={props.onLogin}>
              Авторизоваться
            </button>
          }
        </div>
      </div>     
    </section>
  );
}

export default Navigation;