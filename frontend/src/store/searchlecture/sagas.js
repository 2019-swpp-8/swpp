import * as actions from './actions'
import api from 'services/api'
import { put, call, select, takeEvery, debounce } from 'redux-saga/effects'

export function* getLectureList(dat) {
  try {
    dat = dat.payload;
    let keyword = dat.keyword;
    const lectures_prof = yield call([api, api.get], '/lectures/?prof=' + keyword, {credentials: 'include'});
    const lectures_title = yield call([api, api.get], '/lectures/?title=' + keyword, {credentials: 'include'});
    yield put(actions.updateLectureList(lectures_prof.concat(lectures_title)));
  } catch (e) {

  }
}

export default function* () {
  yield debounce(50, actions.GET_LECTURE_LIST, getLectureList);
}
