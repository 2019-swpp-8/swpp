// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import {NavBar, RequestRow} from 'components'

class HomePage extends React.Component {
  componentDidMount() {
    if (this.props.user.id >= 0) {
      this.props.getProfile(this.props.user.id);
      this.props.getRequestList(this.props.user.id);
    }
  }

  componentDidUpdate() {
    if (this.props.user.id == this.props.profile.id) return;
    this.props.getProfile(this.props.user.id);
    this.props.getRequestList(this.props.user.id);
  }

  render() {
    const {user, profile, requestlist, deleteRequest, changeRequestStatus} = this.props;
    const tutorRequestList = Array.isArray(requestlist.tutor_request) ? requestlist.tutor_request.map(i => (
      <RequestRow key={i.id} user={user.id} request={i} deleteRequest={()=>deleteRequest(i.id, user.id)} changeStatus={(status)=>changeRequestStatus(i.id, status, user.id)} />
    )) : null;
    const tuteeRequestList = Array.isArray(requestlist.tutee_request) ? requestlist.tutee_request.map(i => (
      <RequestRow key={i.id} user={user.id} request={i} deleteRequest={()=>deleteRequest(i.id, user.id)} changeStatus={(status)=>changeRequestStatus(i.id, status, user.id)} />
    )) : null;
    const tutoringList =
        <div className="mt-3">
        <h3> 튜터링 해주는 목록 </h3>

        {tutorRequestList}
        <br />

        <h3> 튜터링 받는 목록 </h3>

        {tuteeRequestList}

      </div>; 

    return (
      <div>
        <NavBar user={user} />
        <div className="container">
        {tutoringList}
        </div>
      </div>
    );
  }
}

export default HomePage;
