import React from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import LoginPopup from "./LoginPopup";
import Main from './Main.js';
import ProtectedRoute from './ProtectedRoute.js';
import RegisterPopup from './RegisterPopup.js';
import RegisterInfoPopup from './RegisterInfoPopup.js';
import SavedNews from './SavedNews.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import { mainApi } from '../utils/MainApi.js' 
import { newsApi } from '../utils/NewsApi.js' 

function App() {
  const expandSize = 3;

  const tokenStorageKey = 'news-token';
  const newsStorageKey = 'last-news';

  const [currentUser, setCurrentUser] = React.useState({});

  const [news, setNews] = React.useState([]);
  const [savedNews, setSavedNews] = React.useState([]);

  const [showNews, setShowNews] = React.useState(false);
  const [showedCount, setShowedCount] = React.useState(expandSize);

  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingError, setLoadingError] = React.useState(null);

  const [loginOpened, setLoginOpened] = React.useState(false);
  const [loginError, setLoginError] = React.useState();

  const [registerOpened, setRegisterOpened] = React.useState(false);
  const [registerError, setRegisterError] = React.useState();
  const [registerInfoOpened, setRegisterInfoOpened] = React.useState(false);

  React.useEffect(() => {
    async function initAsync() {
      await authorizeOnStartupAsync();
      await restoreNewsFromStorage();
    };
    initAsync();

    return () => {};
  }, []);

  const history = useHistory();

  async function authorizeOnStartupAsync() {
    try {
      const token = localStorage.getItem(tokenStorageKey);
      if (!token) {
        return;
      }

      const userData = await mainApi.getUserAsync(token);
      setCurrentUser({ ...userData.data, isAuthorized: true });

      await loadSavedNewsAsync();
    } catch (err) {
      console.log('Ошибка при аутентификации: ', err);
    }
  }

  function restoreNewsFromStorage() {
    try {
      const storedNewsJson = localStorage.getItem(newsStorageKey);
      if (!storedNewsJson) {
        return;
      }

      const storedNews = JSON.parse(storedNewsJson);
      if (storedNews.length > 0) {
        setShowNews(true);
        setNews(storedNews);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function loadSavedNewsAsync() {
    try {
      const token = localStorage.getItem(tokenStorageKey);
      const newsData = await mainApi.getSavedNewsAsync(token);
      setSavedNews(newsData.data);
    } catch (err) {
      console.log('Ошибка при загрузке сохраненных новостей:', err);
    }
  }

  async function handleQueryAsync(query) {
    setShowNews(true);
    setIsLoading(true);
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

      localStorage.setItem(newsStorageKey, JSON.stringify(data));
      setNews(data);
      setShowedCount(expandSize);
      setLoadingError(null);
    } catch (err) {
      console.log('Ошибка при поиске новостей:', err);
      setLoadingError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLoginAsync({ email, password }) {
    try {
      const tokenData = await mainApi.signInAsync({ email, password });
      const token = tokenData.token;
      localStorage.setItem(tokenStorageKey, token);

      const userData = await mainApi.getUserAsync(token);
      setCurrentUser({ ...userData.data, isAuthorized: true });
      setLoginOpened(false);
    } catch (err) {
      console.log('Ошибка при аутентификации:', err);
      setLoginError(err.message);
    }
  }

  function handleLogout() {
    if (currentUser.isAuthorized) {
      const actualNews = news.map(item => {
        return { ...item, _id: undefined }
      });

      setCurrentUser({});
      setNews(actualNews);

      localStorage.removeItem(tokenStorageKey);
      localStorage.setItem(newsStorageKey, JSON.stringify(actualNews));

      history.push('/');
    }
  }

  async function handleRegisterAsync({ email, password, name }) {
    try {
      await mainApi.signUpAsync({ email, password, name });
      showRegisterInfo();
    } catch(err) {
      console.log('Ошибка при регистрации:', err);
      setRegisterError(err.message);
    }
  }

  async function handleCardSaveAsync(card) {
    try {
      const token = localStorage.getItem(tokenStorageKey);
      const saveResult = await mainApi.saveNewsAsync(card, token);
      
      const savedCard = { ...saveResult.data, owner: undefined, __v: undefined };
      const actualNews = news.map(old => (old === card) ? savedCard : old);
      const actualSavedNews = [savedCard].concat(savedNews);

      localStorage.setItem(newsStorageKey, JSON.stringify(actualNews));
      setNews(actualNews);
      setSavedNews(actualSavedNews);
    } catch(err) {
      console.log('Ошибка при сохранении карточки:', err);
    }
  }

  async function handleCardRemoveAsync(card) {
    try {
      const token = localStorage.getItem(tokenStorageKey);
      await mainApi.removeNewsAsync(card._id, token);

      const actualNews = news.map(old => (old === card) ? { ...old, _id: undefined } : old);
      const actualSavedNews = savedNews.filter(old => old._id !== card._id);

      localStorage.setItem(newsStorageKey, JSON.stringify(actualNews));
      setNews(actualNews);
      setSavedNews(actualSavedNews);
    } catch(err) {
      console.log('Ошибка при удалении карточки:', err);
    }
  }

  function showLogin() {
    closeAllPopups();
    setLoginError('');
    setLoginOpened(true);
  };

  function showRegister() {
    closeAllPopups();
    setRegisterError('');
    setRegisterOpened(true);
  }

  function showRegisterInfo() {
    closeAllPopups();
    setRegisterInfoOpened(true);
  }

  function closeAllPopups() {
    setLoginOpened(false);
    setRegisterOpened(false);
    setRegisterInfoOpened(false);
  }

  function handleShowMoreNews() {
    setShowedCount(showedCount + expandSize);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <ProtectedRoute path="/saved-news" redirect="/" canAccess={currentUser}>
            <SavedNews
              news={savedNews}
              onLogin={showLogin}
              onLogout={handleLogout}
              onCardRemove={handleCardRemoveAsync}
            />
          </ProtectedRoute>
          <Route path="/">
            <Main
              news={news}
              showedNewsCount={showedCount}
              showNews={showNews}
              isLoading={isLoading}
              loadingError={loadingError}
              onQuery={handleQueryAsync}
              onLogin={showLogin}
              onLogout={handleLogout}
              onCardSave={handleCardSaveAsync}
              onCardRemove={handleCardRemoveAsync}
              onShowMoreNews={handleShowMoreNews}
            />
          </Route>
        </Switch>
        <LoginPopup
          isOpened={loginOpened}
          error={loginError}
          onLogin={handleLoginAsync}
          onRegisterRedirect={showRegister}
          onClose={closeAllPopups}
        />
        <RegisterPopup
          isOpened={registerOpened}
          error={registerError}
          onRegister={handleRegisterAsync}
          onLoginRedirect={showLogin}
          onClose={closeAllPopups}
        />
        <RegisterInfoPopup
          isOpened={registerInfoOpened}
          onLoginRedirect={showLogin}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
