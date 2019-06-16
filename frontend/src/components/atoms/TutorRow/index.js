import React from 'react'
import _ from 'lodash'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { apiUrl } from 'config'

class TutorRow extends React.Component {
  render() {
   const {tutor, loggedIn} = this.props;
    return typeof tutor === 'undefined' ? null : loggedIn ?
    <div className="card mb-2">
      <div className="card-body">
        <div className="row">
          <div className="col-md-2">
            <h5> <Link to={'/profile/' + tutor['profile']['user']}>{tutor['profile']['name']}</Link></h5>
            전공: {tutor['profile']['major']}
          </div>
          <div className="col-md-4">
            {_(tutor['bio']).truncate(({length: 60}))}
          </div>
          <div className="col-md-4">
            경력: {_(tutor['exp']).truncate(({length: 60}))}
          </div>
          <div className="col-md-2 ">
            <Link to={'/request/' + tutor['profile']['user']} className="btn btn-outline-primary">튜터링 신청하기</Link>
          </div>
        </div>
      </div>
    </div> :
    <div className="card mb-2">
      <div className="card-body">
        <div className="row">
          <div className="col-md-2">
            <h5> <Link to={'/profile/' + tutor['profile']['user']}>{tutor['profile']['name']}</Link></h5>
            전공: {tutor['profile']['major']}
          </div>
          <div className="col-md-4">
            {_(tutor['bio']).truncate(({length: 60}))}
          </div>
          <div className="col-md-4">
            경력: {_(tutor['exp']).truncate(({length: 60}))}
          </div>
          <div className="col-md-2 ">
            <a href={apiUrl + '/auth/login'} className="btn btn-outline-primary">신청</a>
          </div>
        </div>
      </div>
    </div>
  }
}

export default TutorRow;
