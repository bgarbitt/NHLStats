import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/*
Note: The reason I decomposed Team here was because we cannot set default props
      on a prop inside an object in props.
*/

//
// Components
//

const Team = ({ team, logoUrl, glowColor }) => (
  <TeamImageLink name={team.name} id={team.id} logoUrl={logoUrl} glowColor={glowColor} />
);

const TeamImageLink = ({ name, id, logoUrl, glowColor }) => (
  <Link to={`/team/${name.split(' ').join('-')}/${id}`}>
    <TeamLogoImage src={logoUrl} alt={`${name}`} glowColor={glowColor} />
  </Link>
);

export default Team;

//
// Prop Types
//

Team.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  logoUrl: PropTypes.string,
  glowColor: PropTypes.string,
};

TeamImageLink.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  logoUrl: PropTypes.string.isRequired,
  glowColor: PropTypes.string.isRequired,
};

//
// Default Props
//

Team.defaultProps = { logoUrl: 'notFound.png', glowColor: '#000000' };
TeamImageLink.defaultProps = { name: 'name-not-found', id: -1 };

const TeamLogoImage = styled.img`
  object-fit: cover;
  width: 160px;
  height: 100px;
  margin-top: 10px;
  border: 2px;
  border-radius: 20px;
  box-shadow: 0 0 20px silver;

  &:hover {
    box-shadow: 0 5px 35px ${props => props.glowColor};
  }
`;
