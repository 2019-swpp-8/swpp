import * as actions from './actions'
import api from 'services/api'
import { put, call, select, takeEvery } from 'redux-saga/effects'

export function* getProfile(dat) {
  try {
    const id = dat.payload;
    const profile = yield call([api, api.get], '/profile/' + id + '/', {credentials: 'include'});
    yield put(actions.updateProfile(id, profile.major));
  } catch (e) {

  }
}

export default function* () {
  yield takeEvery(actions.GET_PROFILE, getProfile);
}
