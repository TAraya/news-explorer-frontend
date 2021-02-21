import React from 'react';
import './NewsCard.css';

function NewsCard(props) {
  function getReadableDate(dateIsoString) {
    const date = new Date(dateIsoString);
    const tokens = date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).split(' ');

    return `${tokens[0]} ${tokens[1]}, ${tokens[2]}`;
  }

  return (
    <li className="news-card">
      <a className="news-card__image-container" href={props.data.link} rel="noreferrer" target="_blank">
        <img className="news-card__image" src={props.data.image} alt={props.data.title} />
      </a>
      <div className="">
        <p className="news-card__date">{getReadableDate(props.data.date)}</p>
        <h3 className="news-card__title">{props.data.title}</h3>
        <p className="news-card__text">{props.data.text}</p>
      </div>
      <p className="news-card__source">{props.data.source}</p>
    </li>
  );
}

export default NewsCard;