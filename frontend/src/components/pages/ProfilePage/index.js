// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import { NavBar, RequestRow, WeeklyScheduler } from 'components'
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

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
      <Link to='/profile/edit' className="btn btn-outline-primary login-button">수정</Link> :
      "";
    const lectureList = Array.isArray(tutor.lectures) ? tutor.lectures.map(i => (
      <tr key={i.id}><td>{i.prof}</td><td>{i.title}</td></tr>
    )) : <tr></tr>;
    return (
      <div>
        <NavBar user={user} />
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-6">
              <h3> 프로파일 정보 </h3>
              <div> 이름: {profile.name} </div>
              <div> 전공: {profile.major} </div>
              <div> 연락처: {profile.contact} </div>
              <br/>
              <h3> 튜터 정보 </h3>
              <div> 소개: {tutor.bio} </div>
              <div className="mb-1"> 경력: {tutor.exp} </div>
              <br/>
              <h3> 수강한 강의 </h3>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th> 교수님 </th>
                    <th> 강의명 </th>
                  </tr>
                </thead>
                <tbody>
                  {lectureList}
                </tbody>
              </table>

              {editButton}
            </div>
            <div className="col-md-6">
              <h3> 튜터링 가능 시간대 </h3>
              <WeeklyScheduler times={tutor.times} tutoringTimes={tutor.tutoringTimes} readonly={true} inv={false}/>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default withRouter(ProfilePage);
