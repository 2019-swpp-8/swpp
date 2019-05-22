// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import {NavBar} from 'components'
import { withRouter } from 'react-router-dom';

class ProfilePage extends React.Component {
  componentDidMount() {
    this.props.getProfile(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (this.props.profile.id == this.props.match.params.id) return;
    this.props.getProfile(this.props.match.params.id);
  }

  render() {
    const {user, profile} = this.props;
    return (
      <div>
        <NavBar user={user} />
        <div className="container">
          <h3> 프로파일 정보 </h3>
          <div> 이름: {profile.name} </div>
          <div> 전공: {profile.major} </div>
        </div>
      </div>
    );
  };
}

export default withRouter(ProfilePage);
