import * as actions from './actions'
import api from 'services/api'
import { put, call, select, takeEvery } from 'redux-saga/effects'

export function* getNotification(dat) {
  try {
    const id = dat.payload;
    console.log(id)
    const profile = yield call([api, api.get], '/profile/' + id + '/', {credentials: 'include'});
    const note = profile['notifications']
    console.log(note)

    yield put(actions.updateNotification(note))
  } catch (e) {
    console.log(e);
  }
}

export function* deleteNotification(dat) {
  try {
    const id = dat.payload;
    yield call([api, api.delete], '/notification/' + id + '/', {
      headers: { "X-CSRFToken": ('; '+document.cookie).split('; csrftoken=').pop().split(';').shift() },
      credentials: "include"
    });
  } catch (e) {

  }
}

export default function* () {
  yield takeEvery(actions.GET_NOTIFICATION, getNotification);
  yield takeEvery(actions.DELETE_NOTIFICATION, deleteNotification);
}
