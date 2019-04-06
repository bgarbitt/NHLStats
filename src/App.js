import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Team from './Team';

class App extends Component {
  state = { teams: [], teamMediaLinks: {} }

  async componentDidMount() {
    try {
      const nhlApiTeamUrl = 'https://statsapi.web.nhl.com/api/v1/teams';
      const awsApiLogosUrl = 'https://4bd4fqbdl1.execute-api.us-east-1.amazonaws.com/demo-1/logos';

      const apiCallResults = await fetch(nhlApiTeamUrl);
      const teams = await (await apiCallResults.json()).teams;

      const awsCallResults = await fetch(awsApiLogosUrl);
      const teamMediaLinks = await awsCallResults.json();

      this.setState({ teams, teamMediaLinks });
    } catch (e) {
      console.log(e); // eslint-disable-line
    }
  }

  render() {
    const { teams, teamMediaLinks } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {teams.map((team) => {
          const logoUrl = teamMediaLinks[team.name]['team-logo'];
          return <Team key={team.id} team={team} logoUrl={logoUrl} />;
        })}
      </div>
    );
  }
}

export default App;
