import * as actions from './actions'
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

export default function* () {
  yield takeEvery(actions.POST_REQUEST, postRequest);
}
