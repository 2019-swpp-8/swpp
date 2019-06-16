import * as actions from './actions'
import api from 'services/api'
import { put, call, select, takeEvery } from 'redux-saga/effects'

export function* getTutorList(dat) {
  try {
    dat = dat.payload;
    let bio = dat.bio;
    let exp = dat.exp;
    let major = dat.major;
    let lecTitle = dat.lecTitle;
    let lecProf = dat.lecProf;
    if (typeof bio === 'undefined') {
      bio = '';
    }
    if (typeof exp === 'undefined') {
      exp = '';
    }
    if (typeof major === 'undefined') {
      major = '';
    }
    if (typeof lecTitle === 'undefined') {
      lecTitle = '';
    }
    if (typeof lecProf === 'undefined') {
      lecProf = '';
    }
    const profile = yield call([api, api.get], '/tutors/?bio=' + bio +
      '&exp=' + exp + '&major=' + major + '&lecTitle=' + lecTitle
      + '&lecProf=' + lecProf, {credentials: 'include'});
    yield put(actions.updateTutorList(profile));
  } catch (e) {

  }
}

export default function* () {
  yield takeEvery(actions.GET_TUTOR_LIST, getTutorList);
}
