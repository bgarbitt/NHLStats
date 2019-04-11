import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import '../media/fonts/adam-pro.otf';

const Header = () => (
  <TopBar>
    <Link to="/">
      <TitleWrapper>
        <TitleText>NHL STATS DEMO</TitleText>
      </TitleWrapper>
    </Link>
  </TopBar>
);

export default Header;

const TopBar = styled.header`
  background-color: #1d2527;
  min-height: 80px;
  font-family: 'adam-pro';
  align-items: center;
`;

const TitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  margin: 6px 0 0 0;
  width: 430px;
  border-style: solid;
  border-radius: 0 10px 0 10px;
  border-color: #b1cbd4;
  &:hover {
    box-shadow: 0 0 5px #b1cbd4;
    > h1 {
      transform: scale(1.01);
      text-shadow: 0 0 2px #b1cbd4;
      transition: width 1s height 1s;
    }
  }
  &:active {
    box-shadow: 0 0 8px #b1cbd4;
    > h1 {
      transform: scale(0.99);
    }
  }
`;

const TitleText = styled.h1`
  font-size: 50px;
  color: #b1cbd4;
  padding-top: 10px;
  margin: 0;
`;
