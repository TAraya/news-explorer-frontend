import React from 'react';
import './Main.css';
import About from './About.js';
import Footer from './Footer.js';
import Header from './Header.js';
import Navigation from './Navigation.js';
import NewsCardList from './NewsCardList.js';
import SearchForm from './SearchForm.js';

function Main(props) {
  const [burgerOpened, setBurgerOpened] = React.useState(false);

  function showMenu() {
    setBurgerOpened(true);
  };

  function closeMenu() {
    setBurgerOpened(false);
  }

  function handleMenuLogin() {
    closeMenu();
    props.onLogin();
  }

  function handleMenuLogout() {
    closeMenu();
    props.onLogout();
  }

  return (
    <div className="main">
      <Header
        currentPage="main"
        isLight={true}
        onLogin={props.onLogin}
        onLogout={props.onLogout}
        onShowMenu={showMenu}
      />
      <SearchForm
        isLocked={props.isLoading}
        onQuery={props.onQuery}
      />
      {
        props.showNews &&
        <NewsCardList
          expandable
          searchInfo
          data={props.news}
          showedCount={props.showedNewsCount}
          error={props.loadingError}
          isLoading={props.isLoading}
          onShowMore={props.onShowMoreNews}
          onCardSave={props.onCardSave}
          onCardRemove={props.onCardRemove}
          onLoginRedirect={props.onLogin}
        />
      }
      <About />
      <Footer />
      <Navigation
        currentPage="main"
        isOpened={burgerOpened}
        onLogin={handleMenuLogin}
        onLogout={handleMenuLogout}
        onClose={closeMenu}
      />
    </div>
  );
}

export default Main;