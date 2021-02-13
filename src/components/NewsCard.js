import React from 'react';
import './NewsCard.css';

function NewsCard(props) {
  return (
    <li className="news-card">
      <div className="news-card__image-container">
        <img className="news-card__image" src={props.data.image} alt={props.data.title} />
      </div>
      <p className="news-card__date">{props.data.date}</p>
      <h3 className="news-card__title">{props.data.title}</h3>
      <p className="news-card__text">{props.data.text}</p>
      <a className="news-card__source" href={props.data.link}>{props.data.source}</a>
    </li>
  );
}

export default NewsCard;