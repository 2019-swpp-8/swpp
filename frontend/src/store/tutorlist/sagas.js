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
    let times = dat.times;
    let total = dat.total;
    let minInterval = dat.minInterval;
    let timesStr = '';
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
    if (typeof minInterval === 'undefined') {
      minInterval = 1;
    }
    if (typeof times !== 'undefined' && total > 0) {
      timesStr = '&mon=' + times.mon + '&tue=' + times.tue +
        '&wed=' + times.wed + '&thu=' + times.thu + '&fri=' + times.fri +
        '&sat=' + times.sat + '&sun=' + times.sun + '&total=' + total +
        '&minInterval=' + minInterval;
    }
    const profile = yield call([api, api.get], '/tutors/?bio=' + bio +
      '&exp=' + exp + '&major=' + major + '&lecTitle=' + lecTitle
      + '&lecProf=' + lecProf + timesStr, {credentials: 'include'});
    yield put(actions.updateTutorList(profile));
  } catch (e) {

  }
}

export default function* () {
  yield takeEvery(actions.GET_TUTOR_LIST, getTutorList);
}
