import React from 'react';
import './NewsCardList.css';
import NewsCard from './NewsCard.js';
import Preloader from './Preloader.js';

function NewsCardList(props) {
  const expandSize = 3;
  const dataLength = props.data?.length || 0;

  const [showedCount, setShowedCount] = React.useState(
    props.expandable ? expandSize : dataLength);

  function handleShowMoreClick() {
    setShowedCount(showedCount + expandSize);
  }

  function renderPreloaderBlock() {
    return (
      <>
        <Preloader />
        <p className="news-card-list__subdescription">Идет поиск новостей...</p>
      </>
    );
  }

  function renderErrorBlock() {
    return (
      <p className="news-card-list__error">{props.error}</p>
    );
  }

  function renderNotFoundBlock() {
    return (
      props.searchInfo &&
      <>
        <h2 className="news-card-list__description">
          Ничего не найдено.
        </h2>
        <p className="news-card-list__subdescription">
          К сожалению по вашему запросу ничего не найдено.
        </p>
      </>
    );
  }

  function renderDataBlock() {
    return (
      <>
        {
          props.searchInfo &&
          <h2 className="news-card-list__title">Результаты поиска</h2>
        }
        <ul className="news-card-list__cards">
          {
            props.data.slice(0, showedCount).map(card => (
              <NewsCard key={card.index} data={card} />
            ))
          }
        </ul>
      </>
    );
  }

  function renderExpandButton() {
    return (
      props.expandable && (showedCount < props.data.length) &&
      <button
        className="news-card-list__show-button"
        onClick={handleShowMoreClick}>
        Показать еще
      </button>
    )
  }

  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        {
          props.isLoading ? renderPreloaderBlock() :
          props.error ? renderErrorBlock() :
          dataLength === 0 ? renderNotFoundBlock() :
          renderDataBlock()
        }
        {renderExpandButton()}
      </div>
    </section>
  );
}

export default NewsCardList;