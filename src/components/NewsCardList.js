import React from 'react';
import './NewsCardList.css';
import NewsCard from "./NewsCard.js";

function NewsCardList(props) {
  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        {
          props.title &&
          <h2 className="news-card-list__title">
            Результаты поиска
          </h2>
        }
        <ul className="news-card-list__cards">
          {
            props.news.map(card => (
              <NewsCard key={card._id} data={card} />
            ))
          }
        </ul>
        {
          props.onShowMore &&
          <button className="news-card-list__show-button">
            Показать еще
          </button>
        }
      </div>
    </section>
  );
}

export default NewsCardList;