import React from 'react'
import _ from 'lodash'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const NoteRow = ({notification, delFunc}) => {
  if (typeof notification === 'undefined')
    return null;
  return typeof notification === 'undefined' ? null :
  <tr>
    <td> {notification.message} </td>
    <td> <button id="note-chk" onClick={()=>delFunc(notification.id)} className="btn btn-danger mb-2">확인</button> </td>
  </tr>
};

export default NoteRow;
