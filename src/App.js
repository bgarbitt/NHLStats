import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Team from './Team';

const teams = [{
      "id": 1,
      "name": "New Jersey Devils",
  }, {
      "id": 2,
      "name": "Edmonton Oilers",
  }, {
      "id": 3,
      "name": "Calgary Flames",
  },
];


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {teams.map(team => <Team key={team.id} team={team} />)}
      </div>
    );
  }
}

export default App;
