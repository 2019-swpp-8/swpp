import * as actions from './actions'
import api from 'services/api'
import { put, call, select, takeEvery } from 'redux-saga/effects'

export function* getNotification(dat) {
  try {
    const id = dat.payload;
    console.log(id)
    const profile = yield call([api, api.get], '/profile/' + id + '/', {credentials: 'include'});
    const note = profile['notifications']
    console.log(note)

    yield put(actions.updateNotification(note))
  } catch (e) {
    console.log(e);
  }
}

export function* deleteNotification(dat) {
  const id = dat.payload;
  console.log(id);
  try {
    yield call([api, api.delete], '/notification/' + id.noteid + '/', {
      headers: { "X-CSRFToken": ('; '+document.cookie).split('; csrftoken=').pop().split(';').shift() },
      credentials: "include"
    });

  } catch (e) {

  }
  yield put(actions.getNotification(id.userid));
}

export function* checkAll(dat){
  try{
    console.log("chkAll in")
    const id = dat.payload;
    const profile = yield call([api, api.get], '/profile/' + id + '/', {credentials: 'include'});
    const note = profile['notifications']
    console.log(note)
    console.log(note.length)

    for(var i=0;i < note.length;i++){
      console.log(i)
      console.log(note[i]['id'])

      try{
          yield call([api, api.delete], '/notification/' + (note[i])['id'] + '/', {
          headers: { "X-CSRFToken": ('; '+document.cookie).split('; csrftoken=').pop().split(';').shift() },
          credentials: "include"
        });
      } catch (e) {}
    }
    yield put(actions.getNotification(id))
  } catch (e) {

  }
}

export default function* () {
  yield takeEvery(actions.GET_NOTIFICATION, getNotification);
  yield takeEvery(actions.DELETE_NOTIFICATION, deleteNotification);
  yield takeEvery(actions.CHECK_ALL, checkAll);
}
