import React, { Component } from 'react';

class Team extends Component {
  render() {
    const { team } = this.props;
    return (
      <div>
        {team.name}
      </div>
    );
  }
}

export default Team;