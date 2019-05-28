import * as actions from './actions'
import api from 'services/api'
import { put, call, select, takeEvery } from 'redux-saga/effects'

export function* getTutorList(dat) {
  try {
    dat = dat.payload;
    let bio = dat.bio;
    let exp = dat.exp;
    if (typeof bio === 'undefined') {
      bio = '';
    }
    if (typeof exp === 'undefined') {
      exp = '';
    }
    const profile = yield call([api, api.get], '/tutors/?bio=' + bio + '&exp=' + exp, {credentials: 'include'});
    yield put(actions.updateTutorList(profile));
  } catch (e) {

  }
}

export default function* () {
  yield takeEvery(actions.GET_TUTOR_LIST, getTutorList);
}
