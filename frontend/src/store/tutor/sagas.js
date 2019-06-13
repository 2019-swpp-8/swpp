import * as actions from './actions'
import api from 'services/api'
import { put, call, select, takeEvery } from 'redux-saga/effects'

export function* getTutor(dat) {
  try {
    const id = dat.payload;
    const profile = yield call([api, api.get], '/tutor/' + id + '/', {credentials: 'include'});
    yield put(actions.updateTutor(id, profile.bio, profile.exp));
  } catch (e) {

  }
}

export function* putTutor(dat) {
  try {
    const payload = dat.payload;
    const id = payload.id;
    const bio = payload.bio;
    const exp = payload.exp;
    yield call([api, api.put], '/tutor/' + id + '/', {
        bio: payload.bio, exp: payload.exp
    }, {
      headers: { "X-CSRFToken": ('; '+document.cookie).split('; csrftoken=').pop().split(';').shift() },
      credentials: "include"
    });
    yield put(actions.updateTutor(id, payload.bio, payload.exp));
  } catch (e) {

  }
}

export default function* () {
  yield takeEvery(actions.GET_TUTOR, getTutor);
  yield takeEvery(actions.PUT_TUTOR, putTutor);
}
