import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import TeamsList from './TeamsList';
import TeamStats from './TeamStats';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </header>
      <Switch>
        <Route exact path="/" component={TeamsList} />
        <Route path="/team/:name/:id" component={TeamStats} />
        <Route path="/team/:name" component={TeamStats} />
      </Switch>
    </div>
  </Router>
);

export default App;
