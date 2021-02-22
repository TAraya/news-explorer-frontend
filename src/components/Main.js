import React from 'react';
import './Main.css';
import About from './About.js';
import Footer from './Footer.js';
import Header from './Header.js';
import NewsCardList from './NewsCardList.js';
import SearchForm from './SearchForm.js';

function Main(props) {
  return (
    <div className="main">
      <Header
        currentPage="main"
        isLight={true}
        onLogin={props.onLogin}
        onLogout={props.onLogout}
        onShowMenu={props.onShowMenu}
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
        />
      }
      <About />
      <Footer />
    </div>
  );
}

export default Main;