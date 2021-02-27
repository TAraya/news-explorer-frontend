import React from 'react';
import './SavedNews.css'
import Footer from './Footer.js';
import Header from './Header.js';
import Navigation from './Navigation.js';
import NewsCardList from './NewsCardList';
import SavedNewsHeader from './SavedNewsHeader';

function SavedNews(props) {
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
    <main className="saved-news">
      <Header
        currentPage="saved-news"
        onLogin={props.onLogin}
        onLogout={props.onLogout}
        onShowMenu={showMenu}
      />
      <SavedNewsHeader news={props.news} />
      <NewsCardList
        data={props.news}
        showedCount={props.news.length}
        onCardRemove={props.onCardRemove} />
      <Footer />
      <Navigation
        currentPage="saved-news"
        isOpened={burgerOpened}
        onLogin={handleMenuLogin}
        onLogout={handleMenuLogout}
        onClose={closeMenu}
      />
    </main>
  );
}

export default SavedNews;