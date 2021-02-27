import React from 'react';
import './NewsCard.css';
import bookmarkIcon from '../images/bookmark_icon.svg';
import bookmarkIconActive from '../images/bookmark_icon_active.svg';
import bookmarkIconFilled from '../images/bookmark_icon_filled.svg';
import removeIcon from '../images/remove_icon.svg';
import removeIconActive from '../images/remove_icon_active.svg';

function NewsCard(props) {
  const [isActMouseHover, setIsActMouseHover] = React.useState(false);
  const [isActLocked, setIsActLocked] = React.useState(false);

  React.useEffect(() => {
    setIsActLocked(false);
  }, [props]);

  function getReadableDate(dateIsoString) {
    const date = new Date(dateIsoString);
    const tokens = date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).split(' ');

    return `${tokens[0]} ${tokens[1]}, ${tokens[2]}`;
  }
  
  function getActIcon() {
    if (!props.searchInfo) {
      return isActMouseHover ? removeIconActive : removeIcon;
    }

    if (props.data._id) {
      return bookmarkIconFilled;
    }

    return (isActMouseHover && props.canSave) ? bookmarkIconActive : bookmarkIcon;
  }

  function getHint() {
    if (!props.canSave) {
      return 'Войдите, чтобы сохранять статьи';
    }

    return props.data._id ? 'Убрать из сохраненных' : 'Сохранить';
  }

  function handleActClick() {
    setIsActLocked(true);
    setIsActMouseHover(false);

    if (props.data._id) {
      props.onRemove(props.data);
    } else {
      props.canSave ? props.onSave(props.data) : props.onLoginRedirect();
    }
  }

  function handleMouseEnter() {
    setIsActMouseHover(true);
  }

  function handleMouseLeave() {
    setIsActMouseHover(false);
  }

  return (
    <li className="news-card">
      <button
        className="news-card__button"
        disabled={isActLocked}
        onClick={handleActClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        <img src={getActIcon()} alt="Закладка"/>
      </button>
      <a className="news-card__link" href={props.data.link} rel="noreferrer" target="_blank">
        {
          !props.searchInfo &&
          <p className="news-card__keyword">{props.data.keyword}</p>
        }
        {
          isActMouseHover &&
          <p className="news-card__hint">{getHint()}</p>
        }
        <div className="news-card__image-container">
          <img className="news-card__image" src={props.data.image} alt={props.data.title} />
        </div>
        <div className="">
          <p className="news-card__date">{getReadableDate(props.data.date)}</p>
          <h3 className="news-card__title">{props.data.title}</h3>
          <p className="news-card__text">{props.data.text}</p>
        </div>
        <p className="news-card__source">{props.data.source}</p>
      </a>
    </li>
  );
}

export default NewsCard;