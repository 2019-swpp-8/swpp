import * as actions from './actions'
import * as tutorActions from '../tutor/actions'
import api from 'services/api'
import { put, call, select, takeEvery } from 'redux-saga/effects'

export function* getProfile(dat) {
  try {
    const id = dat.payload;
    yield put(actions.updateProfile(id, '로딩중...', '로딩중...'));
    yield put(tutorActions.updateTutor(id, '로딩중...', '로딩중...'));
    yield put(tutorActions.updateTutor(id, '로딩중...', '로딩중...',
      {mon:0,tue:0,wed:0,thu:0,fri:0,sat:0,sun:0},
      {mon:0,tue:0,wed:0,thu:0,fri:0,sat:0,sun:0}));
    const profile = yield call([api, api.get], '/profile/' + id + '/', {credentials: 'include'});
    yield put(actions.updateProfile(id, profile.name, profile.major, profile.tutor));
    yield put(tutorActions.getTutor(profile.tutor));
  } catch (e) {

  }
}

export function* putProfile(dat) {
  try {
    const payload = dat.payload;
    const id = payload.id;
    const name = payload.name;
    const major = payload.major;
    yield call([api, api.put], '/profile/' + id + '/', {
        name: payload.name, major: payload.major
    }, {
      headers: { "X-CSRFToken": ('; '+document.cookie).split('; csrftoken=').pop().split(';').shift() },
      credentials: "include"
    });
    yield put(actions.updateProfile(id, payload.name, payload.major));
  } catch (e) {

  }
}

export default function* () {
  yield takeEvery(actions.GET_PROFILE, getProfile);
  yield takeEvery(actions.PUT_PROFILE, putProfile);
}
