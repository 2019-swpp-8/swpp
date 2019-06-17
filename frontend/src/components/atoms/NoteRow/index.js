import React from 'react'
import _ from 'lodash'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const NoteRow = ({notification, delFunc}) => {

  return typeof notification === 'undefined' ? null :
  <li className="list-group-item">
    {notification['message']}
    <button id="note-chk" onClick={()=>delFunc(notification.id)} className="btn btn-danger mb-2">확인</button>
  </li>
};

export default NoteRow;
