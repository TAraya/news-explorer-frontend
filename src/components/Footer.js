import React from 'react';
import './Footer.css';
import facebookIcon from '../images/facebook_icon.svg';
import githubIcon from '../images/github_icon.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2021 NExplorer, Powered by NewsAPI</p>
        <div className="footer__links">
          <a className="footer__link" href="/">
            Главная
          </a>
          <a className="footer__link" href="https://praktikum.yandex.ru">
            Яндекс.Практикум
          </a>
        </div>
        <div className="footer__icon-links">
          <a className="footer__icon-link" href="https://github.com/TAraya/news-explorer-frontend">
            <img src={githubIcon} alt="GitHub" />
          </a>
          <a className="footer__icon-link" href="https://ru-ru.facebook.com/yandex.praktikum">
            <img src={facebookIcon} alt="Facebook" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;