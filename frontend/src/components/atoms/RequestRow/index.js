import React from 'react'
import _ from 'lodash'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const RequestRow = ({user, request, deleteRequest, changeStatus}) => {
  if (typeof request === 'undefined')
    return null;
  const tutor_name = request['tutor']['profile']['name'];
  const tutee_name = request['tutee']['name'];
  const status = request['status']
  const lecture_info = request['lecture']['prof'] + ' / ' + request['lecture']['title'];
  const detail = request['detail']
  const payment = request['payment']

  const accept_button = <button id="request-accept" onClick={()=>changeStatus(1)} className="btn btn-primary mb-2">수락</button>;
  const complete_button = <button id="request-complete" onClick={()=>changeStatus(2)} className="btn btn-primary mb-2">완료</button>;
  const star_button = <button id="request-star" onClick={()=>deleteRequest()} className="btn btn-primary mb-2">평점</button>;
  const cancel_button = <button id="request-cancel" onClick={()=>deleteRequest()} className="btn btn-danger mb-2">취소</button>;

  const active_button = status == 0 && user == request['tutor']['profile'] ? accept_button :
      status == 1 ? complete_button :
      status == 2 && user == request['tutee']['user'] ? star_button : null;
  return <tr>
    <td> {tutor_name} </td>
    <td> {_(tutee_name).truncate(({length: 30}))} </td>
    <td> {_(lecture_info).truncate(({length: 30}))} </td>
    <td> {_(detail).truncate(({length: 30}))} </td>
    <td> {_(payment).truncate(({length: 30}))} </td>
    <td> {_(status == 0 ? "대기중" : status == 1 ? "진행중" : "완료").truncate(({length: 30}))}
      {active_button}
      {status == 0 ? cancel_button : null}
    </td>
  </tr>
};

export default RequestRow;
