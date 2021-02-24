import React from 'react';
import burgerIconBlack from '../images/burger_icon_black.svg';
import burgerIconWhite from '../images/burger_icon_white.svg';
import logoutIconBlack from '../images/logout_icon_black.svg';
import logoutIconWhite from '../images/logout_icon_white.svg';
import './Header.css';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Header(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function renderLoginButton() {
    return (
      currentUser.isAuthorized
      ? <button className="header__button" onClick={props.onLogout}>
          <span className="header__button-text">
            {currentUser.name}
          </span>
          <img
            className="header__button-icon"
            src={props.isLight ? logoutIconWhite : logoutIconBlack}
            alt="Выход"
          />
        </button>
      : <button className="header__button" onClick={props.onLogin}>
          <span className="header__button-text">Авторизоваться</span>
        </button>
    );
  }

  return (
    <header className={`header${props.isLight ? ' header_light' : ''}`}>
      <div className="header__container">
        <h1 className="header__title">
          NewsExplorer
        </h1>
        <a
          className={`header__link${props.currentPage === 'main' ? ' header__link_current' : ''}`}
          tabIndex={props.currentPage === 'main' ? '-1' : '0'}
          href="/">
          Главная
        </a>
        {
          currentUser.isAuthorized &&
          <a
            className={`header__link${props.currentPage === 'saved-news' ? ' header__link_current' : ''}`}
            tabIndex={props.currentPage === 'saved-news' ? '-1' : '0'}
            href="/saved-news">
            Сохраненные статьи
          </a>
        }
        { renderLoginButton() }
        <button className="header__burger" onClick={props.onShowMenu}>
          <img
            className="header__burger-icon"
            src={props.isLight ? burgerIconWhite : burgerIconBlack}
            alt="Меню"
          />
        </button>
      </div>
    </header>
  );
}

export default Header;