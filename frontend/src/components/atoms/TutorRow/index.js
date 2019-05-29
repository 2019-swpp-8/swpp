import React from 'react'
import _ from 'lodash'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const TutorRow = ({tutor}) => {
  return typeof tutor === 'undefined' ? null :
  <tr className="position-relative">
    <td> <Link className="stretched-link" to={'/profile/' + tutor['profile']['user']}>{tutor['profile']['name']}</Link> </td>
    <td> {tutor['profile']['major']} </td>
    <td> {_(tutor['bio']).truncate(({length: 50}))} </td>
    <td> {_(tutor['exp']).truncate(({length: 50}))} </td>
  </tr>
};

export default TutorRow;
