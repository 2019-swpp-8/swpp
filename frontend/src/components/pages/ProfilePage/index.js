// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import { NavBar, RequestRow } from 'components'
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class ProfilePage extends React.Component {
  componentDidMount() {
    this.props.getProfile(this.props.match.params.id);
    this.props.getRequestList(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (this.props.profile.id == this.props.match.params.id) return;
    this.props.getProfile(this.props.match.params.id);
  }

  render() {
    const {user, profile, tutor, requestlist, deleteRequest, changeRequestStatus} = this.props;
    const editButton = profile.id == user.id ?
      <Link to='/profile/edit' className="btn btn-outline-primary login-button">편집</Link> :
      "";
    const lectureList = Array.isArray(tutor.lectures) ? tutor.lectures.map(i => (
      <tr key={i.id}><td>{i.prof}</td><td>{i.title}</td></tr>
    )) : <tr></tr>;
    const tutorRequestList = Array.isArray(requestlist.tutor_request) ? requestlist.tutor_request.map(i => (
      <RequestRow key={i.id} user={user.id} request={i} deleteRequest={()=>deleteRequest(i.id, user.id)} changeStatus={(status)=>changeRequestStatus(i.id, status, user.id)} />
    )) : <tr></tr>;
    const tuteeRequestList = Array.isArray(requestlist.tutee_request) ? requestlist.tutee_request.map(i => (
      <RequestRow key={i.id} user={user.id} request={i} deleteRequest={()=>deleteRequest(i.id, user.id)} changeStatus={(status)=>changeRequestStatus(i.id, status, user.id)} />
    )) : <tr></tr>;
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
          <br/>
          <h3> 가르칠 수 있는 강의 </h3>
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
          <br/>
          <br/>
          {profile.id == user.id ? (
            <div>
              <h3> 튜터링 해주는 목록 </h3>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th> 튜터 </th>
                    <th> 튜티 </th>
                    <th> 강의 </th>
                    <th> 요구사항 </th>
                    <th> 보수 </th>
                    <th> 상태 </th>
                  </tr>
                </thead>
                <tbody>
                  {tutorRequestList}
                </tbody>
              </table>
              <br/>
              <h3> 튜터링 받는 목록 </h3>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th> 튜터 </th>
                    <th> 튜티 </th>
                    <th> 강의 </th>
                    <th> 요구사항 </th>
                    <th> 보수 </th>
                    <th> 상태 </th>
                  </tr>
                </thead>
                <tbody>
                  {tuteeRequestList}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    );
  };
}

export default withRouter(ProfilePage);
