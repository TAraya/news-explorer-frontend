import React from "react";
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPopup from "./LoginPopup";
import Main from './Main.js';
import Navigation from './Navigation.js';
import SavedNews from './SavedNews.js';

function App() {
  const [burgerOpened, setBurgerOpened] = React.useState(false);
  const [loginOpened, setLoginOpened] = React.useState(false);

  function showMenu() {
    setBurgerOpened(true);
  };

  function closeMenu() {
    setBurgerOpened(false);
  }

  function showLogin() {
    setLoginOpened(true);
  };

  function closeLogin() {
    setLoginOpened(false);
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/saved-news">
          <SavedNews onShowMenu={showMenu} onLogin={showLogin} />
        </Route>
        <Route path="/">
          <Main onShowMenu={showMenu} onLogin={showLogin} />
        </Route>
      </Switch>
      <Navigation
        isOpened={burgerOpened}
        onClose={closeMenu}
        onLogin={showLogin}
      />
      <LoginPopup
        isOpened={loginOpened}
        onClose={closeLogin}
      />
    </div>
  );
}

export default App;
