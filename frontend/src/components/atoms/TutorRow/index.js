import React from 'react'
import _ from 'lodash'

const TutorRow = ({tutor}) => {
  return typeof tutor === 'undefined' ? null :
  <tr>
    <td> {tutor['profile']['name']} </td>
    <td> {tutor['profile']['major']} </td>
    <td> {_(tutor['bio']).truncate(({length: 50}))} </td>
    <td> {_(tutor['exp']).truncate(({length: 50}))} </td>
  </tr>
};

export default TutorRow;
