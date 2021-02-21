import React from 'react';
import './Main.css';
import About from './About.js';
import Footer from './Footer.js';
import Header from './Header.js';
import NewsCardList from './NewsCardList.js';
import SearchForm from './SearchForm.js';
import { newsApi } from '../utils/NewsApi.js' 

function Main(props) {
  const newsLocalStorageKey = 'last-news';
  const loadingErrorText = 'Во время запроса произошла ошибка. ' +
    'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

  const [data, setData] = React.useState([]);
  const [loadingError, setLoadingError] = React.useState(null);
  const [isLoading, setIsLoadind] = React.useState(false);
  const [showData, setShowData] = React.useState(false);

  React.useEffect(() => {
    restoreNewsFromStorage();
  },
  []);

  function restoreNewsFromStorage() {
    try {
      const storedNews = localStorage.getItem(newsLocalStorageKey);
      if (!storedNews) {
        return;
      }

      const data = JSON.parse(storedNews);
      console.log(data);
      if (data.length > 0) {
        setShowData(true);
        setData(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function saveNewsToStorage(data) {
    try {
      localStorage.setItem(newsLocalStorageKey, JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }

  async function loadNews(query) {
    setShowData(true);
    setIsLoadind(true);
    try {
      const now = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(now.getDate() - 7);
      
      const data = await newsApi.getEverythingAsync({
        q: query,
        from: lastWeek,
        to: now,
        pageSize: 100,
      });

      saveNewsToStorage(data);
      setData(data);
      setLoadingError(null);
    } catch (err) {
      setLoadingError(loadingErrorText);
      console.log(err);
    } finally {
      setIsLoadind(false);
    }
  }

  return (
    <div className="main">
      <Header
        currentPage="main"
        isLight={true}
        onLogin={props.onLogin}
        onLogout={props.onLogout}
        onShowMenu={props.onShowMenu}
      />
      <SearchForm
        isLocked={isLoading}
        onQuery={loadNews}
      />
      {
        showData &&
        <NewsCardList
          expandable
          searchInfo
          data={data}
          error={loadingError}
          isLoading={isLoading}
        />
      }
      <About />
      <Footer />
    </div>
  );
}

export default Main;