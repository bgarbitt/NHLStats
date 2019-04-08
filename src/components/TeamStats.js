import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import '../media/css/Fonts.css';
import { TeamLogoImage } from './Team';

// Components

const TeamStats = ({ match }) => <TeamStatsApiCall name={match.params.name} />;

class TeamStatsApiCall extends Component {
  state = {
    teamStats: { venue: {} },
    teamAwsInfo: {},
  }

  async componentDidMount() {
    const { name } = this.props;
    try {
      const awsApiIdUrl = `https://4bd4fqbdl1.execute-api.us-east-1.amazonaws.com/demo-1/id/?name=${name.toLowerCase()}`;
      const teamAwsInfo = await (await fetch(awsApiIdUrl)).json();

      this.setState({ teamAwsInfo });

      const nhlTeamId = this.state.teamAwsInfo['team-id']; // eslint-disable-line
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
      <StatsWrapper backdrop={teamAwsInfo['team-backdrop']}>
        <Stats>
          <Overdrive id={teamStats.name}>
            <TeamLogoImage src={logoUrl} alt={`${teamStats.name}`} glowColor={glowColor} />
          </Overdrive>
          <div>
            <h1>{teamStats.name}</h1>
            <h3>{teamStats.locationName}</h3>
            <p>{teamStats.venue.name}</p>
          </div>
        </Stats>
      </StatsWrapper>
    );
  }
}

export default TeamStats;

// Prop Types

TeamStats.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

TeamStatsApiCall.propTypes = { name: PropTypes.string.isRequired };

// Default Props

// Styled Components

const StatsWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
`;

const Stats = styled.div`
  background: #1d2527ec;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  width: 86%;
  margin: 2% auto;
  > div {
    margin-left: 20px;
    color: #b1cbd4;
  }
  h1 {
    font-family: 'adam-pro';
  }
  img {
    position: relative;
    top: -5rem;
  }
`;
