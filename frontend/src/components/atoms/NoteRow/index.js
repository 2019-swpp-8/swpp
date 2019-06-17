import React from 'react'
import _ from 'lodash'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class NoteRow extends React.Component {
  render() {
    const {notification, delFunc} = this.props;
    return typeof notification === 'undefined' ? null :
      <li className="list-group-item">
        <div className="row align-items-center">
          <div className="col-xl-11 col-lg-10">
            {notification['message']}
          </div>
          <div className="col-xl-1 col-lg-2 text-lg-right text-xl-right">
            <button id="note-chk left-0" onClick={()=>delFunc(notification.id)} className="btn btn-danger">확인</button>
          </div>
        </div>
      </li>;
  }
}

export default NoteRow;
