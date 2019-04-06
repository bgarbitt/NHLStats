import React from 'react';
import PropTypes from 'prop-types';

// Components
const Team = ({ team, logoUrl }) => (
  <TeamInfo name={team.name} location={team.locationName} logoUrl={logoUrl} />
);

const TeamInfo = ({ name, location, logoUrl }) => (
  <div>
    <h3>{ name }</h3>
    <p>{ location }</p>
    <img src={logoUrl} alt="team-logo" />

  </div>
);

export default Team;

// Prop Types
Team.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
  }).isRequired,
  logoUrl: PropTypes.string,
};

TeamInfo.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string,
  logoUrl: PropTypes.string,
};

// Default Props
Team.defaultProps = { logoUrl: 'notFound.png' };
TeamInfo.defaultProps = { location: 'Nowhere', logoUrl: 'notFound.png' };
