import React from 'react';
import './SearchForm.css';

function SearchForm(props) {
  const [query, setQuery] = React.useState('');

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onQuery(query);
  }

  return (
    <form className="search-form" name="search" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <h2 className="search-form__header">
          Что творится в мире?
        </h2>
        <p className="search-form__description">
          Находите самые свежие статьи на любую тему и сохраняйте в своем личном кабинете.
        </p>       
        <div className="search-form__control">
          <input
            className="search-form__input"
            type="text"
            placeholder="Введите тему новости"
            required minLength="1" maxLength="30"
            name="query"
            value={query}
            onChange={handleQueryChange}
          />
          <button className="search-form__submit" type="submit">
            Искать
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;