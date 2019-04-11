import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import '../media/css/App.css';

import Header from './Header';
import TeamsList from './TeamsList';
import TeamStats from './TeamStats';

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={TeamsList} />
        <Route path="/team/:name" component={TeamStats} />
      </Switch>
    </div>
  </Router>
);

export default App;
