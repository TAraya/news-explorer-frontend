import React from 'react';
import './NewsCard.css';
import bookmarkIcon from '../images/bookmark_icon.svg';
import bookmarkIconFilled from '../images/bookmark_icon_filled.svg';
import removeIcon from '../images/remove_icon.svg';

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
  
  function handleSave() {
    props.onSave(props.data);
  }

  function handleRemove() {
    props.onRemove(props.data);
  }

  function renderActButton() {
    return (
      props.data._id
      ? <button className="news-card__button" onClick={handleRemove}>
          {
            !props.searchInfo
            ? <img src={removeIcon} alt="Удалить из закладок"/>
            : <img src={bookmarkIconFilled} alt="Удалить из закладок"/>
          }
        </button>
      : <button className="news-card__button" onClick={handleSave}>
          <img src={bookmarkIcon} alt="Сохранить в закладки"/>
        </button>
    );
  }

  return (
    <li className="news-card">
      {
        !props.searchInfo &&
        <p className="news-card__keyword">{props.data.keyword}</p>
      }
      { renderActButton() }
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