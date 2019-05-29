import React from 'react'

const TutorRow = ({tutor}) => {
  return typeof tutor === 'undefined' ? null :
  <tr>
    <td> {tutor['profile']['name']} </td>
  </tr>
};

export default TutorRow;
