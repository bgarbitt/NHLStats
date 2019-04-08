import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TeamLogoImage } from './Team';

// Components

const TeamStats = ({ match }) => <TeamStatsApiCall name={match.params.name} id={match.params.id} />;

class TeamStatsApiCall extends Component {
  state = { teamStats: { venue: {} }, teamAwsInfo: {} }

  async componentDidMount() {
    const { name, id } = this.props;
    try {
      let nhlTeamId = -1;
      if (id === '-1') {
        const awsApiIdUrl = `https://4bd4fqbdl1.execute-api.us-east-1.amazonaws.com/demo-1/id/?name=${name.toLowerCase()}`;
        const teamAwsInfo = await (await fetch(awsApiIdUrl)).json();

        this.setState({ teamAwsInfo });
        nhlTeamId = this.state.teamAwsInfo['team-id']; // eslint-disable-line
      } else {
        nhlTeamId = id;
      }
      const nhlApiTeamUrl = `https://statsapi.web.nhl.com/api/v1/teams/${nhlTeamId}`;
      const nhlApiCallResults = await fetch(nhlApiTeamUrl);
      const teamStats = await (await nhlApiCallResults.json()).teams[0];

      this.setState({ teamStats });
    } catch (e) {
      console.log(e); // eslint-disable-line
    }
  }

  render() {
    const { teamStats, teamAwsInfo } = this.state;
    const logoUrl = teamAwsInfo['team-logo'];
    const glowColor = teamAwsInfo['team-color'];
    return (
      <div>
        <TeamLogoImage src={logoUrl} alt={`${teamStats.name}`} glowColor={glowColor} />
        <h1>{teamStats.name}</h1>
        <h3>{teamStats.locationName}</h3>
        <p>{teamStats.venue.name}</p>
      </div>
    );
  }
}

export default TeamStats;

//
// Prop Types
//


TeamStats.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

TeamStatsApiCall.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
};

//
// Default Props
//

TeamStatsApiCall.defaultProps = { id: '-1' };
