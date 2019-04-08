import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import styled from 'styled-components';
import '../media/css/App.css';
import logo from '../media/images/logo.png';

import TeamsList from './TeamsList';
import TeamStats from './TeamStats';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <Logo src={logo} alt="logo" />
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

const Logo = styled.img`
  margin-top: 18px;
  border-style: solid;
  border: 1px;
  box-shadow: 0 10px 10px #161b1d;
`;
