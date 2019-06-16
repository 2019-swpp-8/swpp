import React from 'react'
import _ from 'lodash'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { apiUrl } from 'config'

const TutorRow = ({tutor, loggedIn}) => {
  return typeof tutor === 'undefined' ? null : loggedIn ?
  <tr>
    <td> <Link to={'/profile/' + tutor['profile']['user']}>{tutor['profile']['name']}</Link> </td>
    <td> {tutor['profile']['major']} </td>
    <td> {_(tutor['bio']).truncate(({length: 30}))} </td>
    <td> {_(tutor['exp']).truncate(({length: 30}))} </td>
    <td> <Link to={'/request/' + tutor['profile']['user']} className="btn btn-outline-primary">신청</Link> </td>
  </tr> :
  <tr>
    <td> <Link to={'/profile/' + tutor['profile']['user']}>{tutor['profile']['name']}</Link> </td>
    <td> {tutor['profile']['major']} </td>
    <td> {_(tutor['bio']).truncate(({length: 30}))} </td>
    <td> {_(tutor['exp']).truncate(({length: 30}))} </td>
    <td> <a href={apiUrl + '/auth/login'} className="btn btn-outline-primary">신청</a> </td>
  </tr>
};

export default TutorRow;
