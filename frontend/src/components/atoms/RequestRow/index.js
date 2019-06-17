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

  const accept_button = <button id="request-accept" onClick={()=>changeStatus(1)} className="btn btn-outline-primary">수락</button>;
  const complete_button = <button id="request-complete" onClick={()=>changeStatus(2)} className="btn btn-outline-primary">완료</button>;
  const star_button = <button id="request-star" onClick={()=>deleteRequest()} className="btn btn-outline-primary">평점</button>;
  const cancel_button = <button id="request-cancel" onClick={()=>deleteRequest()} className="btn btn-outline-danger">취소</button>;
  const times_button = <button id="request-times" data-toggle="modal" data-target={'#modal-' + request['id']} className="btn btn-outline-dark mt-1">시간대 확인</button>;

  const active_button = status == 0 && user == request['tutor']['profile']['user'] ? accept_button :
      status == 1 ? complete_button : null;

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

  const two_buttons = <div className="btn-group mt-1 d-block" role="group"> {active_button}{cancel_button} </div>;
  const single_button = <div className="mt-1"> {active_button} </div>;

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
        상태: {_(status == 0 ? "대기중" : status == 1 ? "진행중" : "완료됨").truncate(({length: 30}))}
          { status == 0 ? two_buttons : single_button }
        </div>
      </div>
    </div>
  </div>;
};

export default RequestRow;
