import React from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import LoginPopup from "./LoginPopup";
import Main from './Main.js';
import Navigation from './Navigation.js';
import ProtectedRoute from './ProtectedRoute.js';
import RegisterPopup from './RegisterPopup.js';
import RegisterInfoPopup from './RegisterInfoPopup.js';
import SavedNews from './SavedNews.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import { mainApi } from '../utils/MainApi.js' 

function App() {
  const tokenStorageKey = 'news-token';

  const [currentUser, setCurrentUser] = React.useState({});
  const [burgerOpened, setBurgerOpened] = React.useState(false);
  const [loginOpened, setLoginOpened] = React.useState(false);
  const [loginError, setLoginError] = React.useState();
  const [registerOpened, setRegisterOpened] = React.useState(false);
  const [registerError, setRegisterError] = React.useState();
  const [registerInfoOpened, setRegisterInfoOpened] = React.useState(false);

  React.useEffect(() => {
    authorizeOnStartupAsync();
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
    } catch (err) {
      console.log('Ошибка при аутентификации: ' + JSON.stringify(err));
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
      console.log('Ошибка при аутентификации: ' + JSON.stringify(err));
      setLoginError(err.message);
    }
  }

  function handleLogout() {
    if (currentUser.isAuthorized) {
      setCurrentUser({})
      localStorage.removeItem(tokenStorageKey);
      history.push('/');
    }
  }

  async function handleRegisterAsync({ email, password, name }) {
    try {
      await mainApi.signUpAsync({ email, password, name });
      showRegisterInfo();
    } catch(err) {
      console.log('Ошибка при регистрации: ' + JSON.stringify(err));
      setRegisterError(err.message);
    }
  }

  async function handleCardSaveAsync(card) {
    try {
      const token = localStorage.getItem(tokenStorageKey);
      const data = { ...card };
      data.index = undefined;

      await mainApi.saveNewsAsync(data, token);
      showRegisterInfo();
    } catch(err) {
      console.log('Ошибка при сохранении карточки: ' + JSON.stringify(err));
    }
  }

  async function handleCardRemoveAsync(card) {
    try {
      const token = localStorage.getItem(tokenStorageKey);
      await mainApi.removeNewsAsync(card._id, token)
      showRegisterInfo();
    } catch(err) {
      console.log('Ошибка при удалении карточки: ' + JSON.stringify(err));
    }
  }

  function showMenu() {
    setBurgerOpened(true);
  };

  function closeMenu() {
    setBurgerOpened(false);
  }

  function showLogin() {
    closeAllPopups();
    setLoginOpened(true);
  };

  function showRegister() {
    closeAllPopups();
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <ProtectedRoute path="/saved-news" redirect="/" canAccess={currentUser}>
            <SavedNews
              onShowMenu={showMenu}
              onLogin={showLogin}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
          <Route path="/">
            <Main
              onShowMenu={showMenu}
              onLogin={showLogin}
              onLogout={handleLogout}
              onCardSave={handleCardSaveAsync}
              onCardRemove={handleCardRemoveAsync}
            />
          </Route>
        </Switch>
        <Navigation
          isOpened={burgerOpened}
          onLogin={showLogin}
          onLogout={handleLogout}
          onClose={closeMenu}
        />
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
