import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/*
Note: The reason I decomposed Team here was because we cannot set default props
      on a prop inside an object in props.
*/

// Components
const Team = ({ team, logoUrl }) => (
  <TeamImageLink name={team.name} id={team.id} logoUrl={logoUrl} />
);

const TeamImageLink = ({ name, id, logoUrl }) => (
  <Link to={`/team/${name.split(' ').join('-')}/${id}`}>
    <img src={logoUrl} alt={`${name}`} />
  </Link>
);

export default Team;

// Prop Types
Team.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  logoUrl: PropTypes.string,
};

TeamImageLink.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  logoUrl: PropTypes.string.isRequired,
};

// Default Props
Team.defaultProps = { logoUrl: 'notFound.png' };
TeamImageLink.defaultProps = { name: 'name-not-found', id: -1 };
