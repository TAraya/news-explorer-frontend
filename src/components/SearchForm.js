import React from 'react';
import './SearchForm.css';

function SearchForm(props) {
  return (
    <form className="search-form">
      <div className="search-form__container">
        <h2 className="search-form__header">Что творится в мире?</h2>
        <p className="search-form__description">
          Находите самые свежие статьи на любую тему и сохраняйте в своем личном кабинете.
        </p>       
        <div className="search-form__control">
          <input className="search-form__input" type="text" placeholder="Введите тему новости"/>
          <button className="search-form__submit" type="submit">
            Искать
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;