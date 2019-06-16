import * as actions from './actions'
import api from 'services/api'
import { put, call, select, takeEvery } from 'redux-saga/effects'

export function* checkUser() {
  try {
    let me = yield call([api, api.get], '/user/current/', {credentials: 'include'});
    let profile = yield call([api, api.get], '/profile/' + me.id + '/', {credentials: 'include'});
    yield put(actions.setUser(me.id, me.username, profile.name));
  } catch (e) {
    yield put(actions.unsetUser());
  }
}

export default function* () {
  yield takeEvery(actions.CHECK_USER, checkUser);
}
