import React, { Component } from 'react';
import styled from 'styled-components';

import Team from './Team';

class TeamsList extends Component {
  state = { teams: [], teamMediaLinks: {} }

  async componentDidMount() {
    try {
      const nhlApiTeamsUrl = 'https://statsapi.web.nhl.com/api/v1/teams';
      const awsApiLogosUrl = 'https://4bd4fqbdl1.execute-api.us-east-1.amazonaws.com/demo-1/logos';

      const apiCallResults = await fetch(nhlApiTeamsUrl);
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
      <TeamGrid>
        {teams.map((team) => {
          const teamName = team.name.split(' ').join('-').toLowerCase();
          const logoUrl = teamMediaLinks[teamName]['team-logo'];
          const glowColor = teamMediaLinks[teamName]['team-color'];
          return (
            <div key={team.id}>
              <Team team={team} logoUrl={logoUrl} glowColor={glowColor} />
            </div>
          );
        })}
      </TeamGrid>
    );
  }
}

export default TeamsList;

const TeamGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  > div {
    flex: 0 0 calc(16.66% - 20px);
    margin: 5px 10px 5px 10px;
  }
`;
