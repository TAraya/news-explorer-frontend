import React from 'react';
import burgerIconBlack from '../images/burger_icon_black.svg';
import burgerIconWhite from '../images/burger_icon_white.svg';
import logoutIcon from '../images/logout_icon.svg';
import './Header.css';

function Header(props) {
  return (
    <header className={`header${props.isLight ? ' header_light' : ''}`}>
      <div className="header__container">
        <h1 className="header__title">NewsExplorer</h1>
        <div className="header__links">
          <a className={`header__link${props.isMain ? ' header__link_current' : ''}`} href="/">
            Главная
          </a>
          {
            // props.loggedIn &&
            <a className={`header__link${props.isSavedNews? ' header__link_current' : ''}`} href="/saved-news">
              Сохраненные статьи
            </a>
          }
        </div>
        {
          props.loggedIn ?
          <button className="header__button">
            Гретта
            <img className="header__button-icon" src={logoutIcon} alt="Выход" />
          </button> :
          <button className="header__button">
            Авторизоваться
          </button>
        }
        <button className="header__burger">
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