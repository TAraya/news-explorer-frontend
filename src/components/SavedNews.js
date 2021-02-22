import React from 'react';
import './SavedNews.css'
import Footer from './Footer.js';
import Header from './Header.js';
import NewsCardList from './NewsCardList';
import SavedNewsHeader from './SavedNewsHeader';

function SavedNews(props) {
  return (
    <main className="saved-news">
      <Header
        currentPage="saved-news"
        onLogin={props.onLogin}
        onLogout={props.onLogout}
        onShowMenu={props.onShowMenu}
      />
      <SavedNewsHeader news={props.news} />
      <NewsCardList
        data={props.news}
        showedCount={props.news.length}
        onCardRemove={props.onCardRemove} />
      <Footer />
    </main>
  );
}

export default SavedNews;