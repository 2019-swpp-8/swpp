import * as actions from './actions'
import api from 'services/api'
import { put, call, select, takeEvery } from 'redux-saga/effects'

export function* checkUser() {
  try {
    let me = yield call([api, api.get], '/users/current/');
    yield put(actions.setUser(me.id, me.username));
  } catch (e) {
    yield put(actions.unsetUser());
  }
}

export default function* () {
  yield takeEvery(actions.CHECK_USER, checkUser);
}
