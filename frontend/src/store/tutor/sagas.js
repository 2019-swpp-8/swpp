import * as actions from './actions'
import api from 'services/api'
import { put, call, select, takeEvery } from 'redux-saga/effects'

export function* getTutor(dat) {
  try {
    const id = dat.payload;
    const tutor = yield call([api, api.get], '/tutor/' + id + '/', {credentials: 'include'});
    const times = yield call([api, api.get], '/times/' + profile.times + '/', {credentials: 'include'});
    const tutoringTimes = yield call([api, api.get], '/times/' + profile.tutoringTimes + '/', {credentials: 'include'});
    yield put(actions.updateTutor(id, tutor.bio, tutor.exp, tutor.lectures, times, tutoringTimes));
  } catch (e) {

  }
}

export function* putTutor(dat) {
  try {
    const payload = dat.payload;
    const id = payload.id;
    const bio = payload.bio;
    const exp = payload.exp;
    const lectures = payload.lectures.map(i=>i.id);
    const times = payload.times;
    yield call([api, api.put], '/tutor/' + id + '/', {
        bio: bio, exp: exp, lectures: lectures
    }, {
      headers: { "X-CSRFToken": ('; '+document.cookie).split('; csrftoken=').pop().split(';').shift() },
      credentials: "include"
    });
    yield call([api, api.put], '/times/' + times.id + '/', {
      mon: times.mon, tue: times.tue, wed: times.wed, thu: times.thu,
      fri: times.fri, sat: times.sat, sun: times.sun,
    }, {
      headers: { "X-CSRFToken": ('; '+document.cookie).split('; csrftoken=').pop().split(';').shift() },
      credentials: "include"
    });
    yield put(actions.getTutor(id));
  } catch (e) {

  }
}

export default function* () {
  yield takeEvery(actions.GET_TUTOR, getTutor);
  yield takeEvery(actions.PUT_TUTOR, putTutor);
}
