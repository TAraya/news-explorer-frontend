import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import closeIcon from '../images/close_icon.svg';
import logoutIcon from '../images/logout_icon_white.svg';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Navigation(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleOverlayClick(evt) {
    if (evt.target.classList.contains('navigation')) {
      props.onClose();
    }
  };

  function renderLoginButton() {
    return (
      currentUser.isAuthorized
      ? <button className="navigation__button" onClick={props.onLogout}>
          <span className="navigation__button-text">{currentUser.name}</span>
          <img className="navigation__button-icon" src={logoutIcon} alt="Выход" />
        </button>
      : <button className="navigation__button" onClick={props.onLogin}>
          <span className="navigation__button-text">Авторизоваться</span>
        </button>
    );
  }

  return (
    <section
      className={`navigation${props.isOpened ? ' navigation_opened' : ''}`}
      onClick={handleOverlayClick}
      >
      <div className="navigation__container">
        <h2 className="navigation__title">
          NewsExplorer
        </h2>
        <button className="navigation__close-button" onClick={props.onClose}>
          <img className="navigation__close-icon" src={closeIcon} alt="Закрыть" />
        </button>
        <div className="navigation__links">
          <Link
            className={`navigation__link${props.currentPage === 'main' ? ' navigation__link_current' : ''}`}
            tabIndex={props.currentPage === 'main' ? '-1' : '0'}
            to="/">
            Главная
          </Link>
          {
            currentUser.isAuthorized &&
            <Link
              className={`navigation__link${props.currentPage === 'saved-news' ? ' navigation__link_current' : ''}`}
              tabIndex={props.currentPage === 'saved-news' ? '-1' : '0'}
              to="/saved-news">
              Сохраненные статьи
            </Link>
          }
          { renderLoginButton() }
        </div>
      </div>     
    </section>
  );
}

export default Navigation;