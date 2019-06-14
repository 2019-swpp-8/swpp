import * as actions from './actions'
import api from 'services/api'
import { put, call, select, takeEvery } from 'redux-saga/effects'

export function* getRequestList(dat) {
  try {
    dat = dat.payload;
    let id = dat.id;
    const tutor_request = yield call([api, api.get], '/requests/?tutor=' + id, {credentials: 'include'});
    const tutee_request = yield call([api, api.get], '/requests/?tutee=' + id, {credentials: 'include'});
    yield put(actions.updateRequestList(tutor_request, tutee_request));
  } catch (e) {

  }
}

export default function* () {
  yield takeEvery(actions.GET_REQUEST_LIST, getRequestList);
}
