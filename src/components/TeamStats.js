import React, { Component } from 'react';
import {
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import '../media/css/Fonts.css';
import { TeamLogoImage } from './Team';

import notFound from '../media/images/notFound.png';

// Components

const TeamStats = ({ match }) => <TeamStatsApiCall name={match.params.name} url={match.url} />;


// NOTE: The switch here is the first time I used react-router as a conditional
// renderer. It works like a normal react-dom switch (renders component based on
// url), except I pass props to the component without cluttering the url. This
// is done by utilizing the <Route />'s render prop. We get to pass props directly
// to the component being rendered!
class TeamStatsApiCall extends Component {
  state = {
    teamStats: { venue: {} },
    teamAwsInfo: { 'team-logo': { notFound } },
    teamInfoProps: {},
    teamVenueProps: {},
    teamHistoryProps: {},
  }

  async componentDidMount() {
    const { name } = this.props;
    try {
      const awsApiIdUrl = `https://4bd4fqbdl1.execute-api.us-east-1.amazonaws.com/demo-1/id/?name=${name}`;
      const teamAwsInfo = await (await fetch(awsApiIdUrl)).json();

      const nhlTeamId = teamAwsInfo['team-id']; // eslint-disable-line
      const nhlApiTeamUrl = `https://statsapi.web.nhl.com/api/v1/teams/${nhlTeamId}`;
      const nhlApiCallResults = await fetch(nhlApiTeamUrl);
      const teamStats = await (await nhlApiCallResults.json()).teams[0];

      this.setState({
        teamStats,
        teamAwsInfo,
        teamInfoProps: {
          name: teamStats.name,
          abbreviation: teamStats.abbreviation,
          location: teamStats.locationName,
          website: teamStats.officialSiteUrl,
        },
        teamVenueProps: {
          venueName: teamStats.venue.name,
          venueCity: teamStats.venue.city,
          venueTimeZone: teamStats.venue.tz,
        },
        teamHistoryProps: {
          firstYear: teamStats.firstYearOfPlay,
          divisionName: teamStats.division.name,
          conferenceName: teamStats.conference.name,
        },
      });
    } catch (e) {
      console.log(e); // eslint-disable-line
    }
  }

  render() {
    const {
      teamStats,
      teamAwsInfo,
      teamInfoProps,
      teamVenueProps,
      teamHistoryProps,
    } = this.state;
    const { name, url } = this.props;
    const logoUrl = teamAwsInfo['team-logo'];
    const glowColor = teamAwsInfo['team-color'];
    return (
      <StatsWrapper backdrop={teamAwsInfo['team-backdrop']}>
        <Stats>
          <Overdrive id={name}>
            <TeamLogoImage src={logoUrl} alt={`${teamStats.name}`} glowColor={glowColor} />
          </Overdrive>
          <Link to={`${url}/team-info`}><p>team-info</p></Link>
          <Link to={`${url}/venue-info`}><p>venue-info</p></Link>
          <Link to={`${url}/team-history`}><p>team-history</p></Link>
          <Switch>
            <Route
              exact
              path={`${url}/team-info`}
              render={props => <TeamInfo {...props} teamInfo={teamInfoProps} />}
            />
            <Route
              path={`${url}/venue-info`}
              render={props => <VenueInfo {...props} venueInfo={teamVenueProps} />}
            />
            <Route
              path={`${url}/team-history`}
              render={props => <TeamHistory {...props} teamHistory={teamHistoryProps} />}
            />
          </Switch>
        </Stats>
      </StatsWrapper>
    );
  }
}

const TeamInfo = ({ teamInfo }) => <p>{teamInfo.name}</p>;

const VenueInfo = ({ venueInfo }) => <p>{venueInfo.venueName}</p>;

const TeamHistory = ({ teamHistory }) => <p>{teamHistory.firstYear}</p>;

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
