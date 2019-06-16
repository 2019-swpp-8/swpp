import React from 'react'
import _ from 'lodash'
import {WeeklyScheduler} from 'components'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const RequestRow = ({user, request, deleteRequest, changeStatus}) => {
  if (typeof request === 'undefined')
    return null;
  const tutor_name = request['tutor']['profile']['name'];
  const tutee_name = request['tutee']['name'];
  const status = request['status']
  const lecture_info = request['lecture']['title'];
  const detail = request['detail']
  const payment = request['payment']

  const accept_button = <button id="request-accept" onClick={()=>changeStatus(1)} className="btn btn-outline-primary ml-2">수락하기</button>;
  const complete_button = <button id="request-complete" onClick={()=>changeStatus(2)} className="btn btn-outline-primary ml-2">완료하기</button>;
  const star_button = <button id="request-star" onClick={()=>deleteRequest()} className="btn btn-outline-primary ml-2">평점주기</button>;
  const cancel_button = <button id="request-cancel" onClick={()=>deleteRequest()} className="btn btn-outline-danger ml-2">취소하기</button>;
  const times_button = <button id="request-times" data-toggle="modal" data-target={'#modal-' + request['id']} className="btn btn-outline-dark btn">시간대 확인하기</button>;

  const active_button = status == 0 && user == request['tutor']['profile']['user'] ? accept_button :
      status == 1 ? complete_button :
      status == 2 && user == request['tutee']['user'] ? star_button : null;

  const modal =
  <div className="modal fade" id={'modal-' + request['id']} tabIndex="-1" role="dialog" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">튜터링 시간</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <WeeklyScheduler times={request['times']} readonly={true} />
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">확인</button>
        </div>
      </div>
    </div>
  </div>;

  return <div className="card mb-2">
    <div className="card-body">
      <div className="row">
        <div className="col-md-3">
          <h5> {tutor_name} 🡢 {tutee_name} </h5>
          {_(lecture_info).truncate(({length: 16}))}
        </div>
        <div className="col-md-4">
          상세: {_(detail).truncate(({length: 60}))}
        </div>
        <div className="col-md-3">
          보수: {_(payment).truncate(({length: 30}))}
          <div> {times_button}
          {modal} </div>
        </div>
        <div className="col-md-2">
        상태:<br />
        {_(status == 0 ? "대기중" : status == 1 ? "진행중" : "완료됨").truncate(({length: 30}))}
          {active_button}
          {status == 0 ? cancel_button : null}
        </div>
      </div>
    </div>
  </div>;
};

export default RequestRow;
