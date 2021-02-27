import React from 'react';
import './NewsCardList.css';
import NewsCard from './NewsCard.js';
import Preloader from './Preloader.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function NewsCardList(props) {
  const currentUser = React.useContext(CurrentUserContext);

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
            props.data.slice(0, props.showedCount).map((card, index) => (
              <NewsCard
                key={props.searchInfo ? index : card._id}
                data={card}
                searchInfo={props.searchInfo}
                canSave={currentUser.isAuthorized}
                onLoginRedirect={props.onLoginRedirect}
                onSave={props.onCardSave}
                onRemove={props.onCardRemove}
              />
            ))
          }
        </ul>
      </>
    );
  }

  function renderExpandButton() {
    return (
      props.expandable && (props.showedCount < props.data.length) && !props.isLoading &&
      <button
        className="news-card-list__show-button"
        onClick={props.onShowMore}>
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
          props.data.length === 0 ? renderNotFoundBlock() :
          renderDataBlock()
        }
        {renderExpandButton()}
      </div>
    </section>
  );
}

export default NewsCardList;