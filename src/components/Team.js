import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';

import notFound from '../media/images/notFound.png';

/*
Note: The reason I decomposed Team here was because we cannot set default props
      on a prop inside an object in props.
*/

// Components

const Team = ({ team, logoUrl, glowColor }) => (
  <TeamImageLink name={team.name} logoUrl={logoUrl} glowColor={glowColor} />
);

const TeamImageLink = ({ name, logoUrl, glowColor }) => (
  <Link to={`/team/${name.split(' ').join('-').toLowerCase()}`}>
    <Overdrive id={name}>
      <TeamLogoImage src={logoUrl} alt={`${name}`} glowColor={glowColor} />
    </Overdrive>
  </Link>
);

export default Team;

// Prop Types

Team.propTypes = {
  team: PropTypes.shape({ name: PropTypes.string }).isRequired,
  logoUrl: PropTypes.string,
  glowColor: PropTypes.string,
};

TeamImageLink.propTypes = {
  name: PropTypes.string,
  logoUrl: PropTypes.string.isRequired,
  glowColor: PropTypes.string.isRequired,
};

// Default Props

Team.defaultProps = { logoUrl: { notFound }, glowColor: '#000000' };
TeamImageLink.defaultProps = { name: 'name-not-found' };

export const TeamLogoImage = styled.img`
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
