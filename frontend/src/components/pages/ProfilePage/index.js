// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import {NavBar} from 'components'
import { withRouter } from 'react-router-dom';

class ProfilePage extends React.Component {
  componentDidMount() {
    this.props.getProfile(this.props.match.params.id);
  }

  componentDidUpdate() {
    this.props.getProfile(this.props.match.params.id);
  }

  render() {
    const {user, profile} = this.props;
    return (
      <div>
        <NavBar user={user} />
        <div className="container">
        전공: {profile.major}
        </div>
      </div>
    );
  };
}

export default withRouter(ProfilePage);
