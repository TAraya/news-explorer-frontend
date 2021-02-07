import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader() {
  return (
    <section className="saved-news-header">
      <h1 className="saved-news-header__title">Сохраненные статьи</h1>
      <p className="saved-news-header__info">Грета, у вас 5 сохраненных статей</p>
      <p className="saved-news-header__keywords">
        По ключевым словам: 
        <span className="saved-news-header__keywords-span">
          Природа, Тайга и 2м другим
        </span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;