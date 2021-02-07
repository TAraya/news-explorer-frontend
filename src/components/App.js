import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from './Main.js';
import SavedNews from './SavedNews.js';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/saved-news">
          <SavedNews />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
