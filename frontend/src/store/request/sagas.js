import * as actions from './actions'
import * as requestListActions from '../requestlist/actions'
import api from 'services/api'
import { put, call, select, takeEvery } from 'redux-saga/effects'

export function* postRequest(dat) {
  try {
    const payload = dat.payload;
    const tutor = payload.tutor;
    const tutee = payload.tutee;
    const lecture = payload.lecture;
    const detail = payload.detail;
    const payment = payload.payment;
    const mon = payload.times.mon;
    const tue = payload.times.tue;
    const wed = payload.times.wed;
    const thu = payload.times.thu;
    const fri = payload.times.fri;
    const sat = payload.times.sat;
    const sun = payload.times.sun;
    const status = 0;
    yield call([api, api.post], '/requests/', {
        tutor, tutee, lecture, detail, payment, mon, tue, wed, thu, fri, sat, sun, status
    }, {
      headers: { "X-CSRFToken": ('; '+document.cookie).split('; csrftoken=').pop().split(';').shift() },
      credentials: "include"
    });
  } catch (e) {

  }
}

export function* deleteRequest(dat) {
  try {
    const payload = dat.payload;
    const request_id = payload.request_id;
    const user_id = payload.user_id;
    yield call([api, api.delete], '/request/' + request_id + '/', {
      headers: { "X-CSRFToken": ('; '+document.cookie).split('; csrftoken=').pop().split(';').shift() },
      credentials: "include"
    });
  } catch (e) {

  }
  yield put(requestListActions.getRequestList(dat.payload.user_id));
}

export function* changeRequestStatus(dat) {
  try {
    const payload = dat.payload;
    const request_id = payload.request_id;
    const status = payload.status;
    const user_id = payload.user_id;

    yield call([api, api.put], '/request/' + request_id + '/', {
        status
    }, {
      headers: { "X-CSRFToken": ('; '+document.cookie).split('; csrftoken=').pop().split(';').shift() },
      credentials: "include"
    });
    yield put(requestListActions.getRequestList(user_id));
  } catch (e) {

  }
}

export default function* () {
  yield takeEvery(actions.POST_REQUEST, postRequest);
  yield takeEvery(actions.DELETE_REQUEST, deleteRequest);
  yield takeEvery(actions.CHANGE_REQUEST_STATUS, changeRequestStatus);
}
