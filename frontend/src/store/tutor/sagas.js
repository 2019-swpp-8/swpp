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

export default function* () {
  yield takeEvery(actions.GET_TUTOR, getTutor);
}
