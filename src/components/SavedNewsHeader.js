import React from 'react';
import './SavedNewsHeader.css';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function SavedNewsHeader(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function getKeywordsInfo() {
    const keywordCounts = {};
    props.news.forEach(item => {
      if (keywordCounts[item.keyword]) {
        keywordCounts[item.keyword]++;
      } else {
        keywordCounts[item.keyword] = 1;
      }
    });

    const keywords = Object.entries(keywordCounts)
      .sort((a, b) => b[1] - a[1]).map((item) => item[0]);
    
    if (keywords.length === 1) {
      return keywords[0];
    }

    if (keywords.length === 2) {
      return `${keywords[0]} и ${keywords[1]}`;
    }

    if (keywords.length === 3) {
      return `${keywords[0]}, ${keywords[1]} и ${keywords[2]}`;
    }

    return `${keywords[0]}, ${keywords[1]} и ${keywords.length - 2} другим`;
  }

  return (
    <section className="saved-news-header">
      <h1 className="saved-news-header__title">Сохраненные статьи</h1>
      <p className="saved-news-header__info">
        {`${currentUser.name}, у вас ${props.news.length > 0 ? props.news.length : 'нет'} сохраненных статей`}
      </p>
      {
        props.news.length > 0 &&
        <p className="saved-news-header__keywords">
          По ключевым словам: 
          <span className="saved-news-header__keywords-span">{getKeywordsInfo()}</span>
        </p>
      }
    </section>
  );
}

export default SavedNewsHeader;