import React from 'react';
import './Navigation.css';
import closeIcon from '../images/close_icon.svg';
import logoutIcon from '../images/logout_icon_white.svg';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Navigation(props) {
  const currentUser = React.useContext(CurrentUserContext);

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
            currentUser.isAuthorized &&
            <a className="navigation__link" href="/saved-news">
              Сохраненные статьи
            </a>
          }
          {
            currentUser.isAuthorized ?
            <button className="navigation__button" onClick={props.onLogout}>
              {currentUser.name}
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