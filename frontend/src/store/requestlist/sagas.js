import * as actions from './actions'
import api from 'services/api'
import { put, call, select, takeEvery } from 'redux-saga/effects'

export function* getRequestList(dat) {
  try {
    dat = dat.payload;
    let id = dat.id;
    const tutor = yield call([api, api.get], '/tutor/' + id + '/', {credentials: 'include'});
    yield put(actions.updateRequestList(tutor.requests, tutor.profile.requests));
  } catch (e) {

  }
}

export default function* () {
  yield takeEvery(actions.GET_REQUEST_LIST, getRequestList);
}
