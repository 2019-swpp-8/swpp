// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import {NavBar} from 'components'
import { withRouter } from 'react-router-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class ProfilePage extends React.Component {
  componentDidMount() {
    this.props.getProfile(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (this.props.profile.id == this.props.match.params.id) return;
    this.props.getProfile(this.props.match.params.id);
  }

  render() {
    const {user, profile, tutor} = this.props;
    const editButton = profile.id == user.id ?
      <Link to='/profile/edit' className="btn btn-outline-primary login-button">편집</Link> :
      "";
    return (
      <div>
        <NavBar user={user} />
        <div className="container mt-3">
          <h3> 프로파일 정보 </h3>
          <div> 이름: {profile.name} </div>
          <div> 전공: {profile.major} </div>
          <br/>
          <h3> 튜터 정보 </h3>
          <div> 소개: {tutor.bio} </div>
          <div> 경력: {tutor.exp} </div>
          {editButton}
        </div>
      </div>
    );
  };
}

export default withRouter(ProfilePage);
