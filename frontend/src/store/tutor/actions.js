// sagas
export const GET_TUTOR = 'GET_TUTOR';
export const PUT_TUTOR = 'PUT_TUTOR';

// reducers
export const UPDATE_TUTOR = 'UPDATE_TUTOR';

export const getTutor = (id) => ({
  type: GET_TUTOR,
  payload: id,
});

export const updateTutor = (id, bio, exp, lectures) => ({
  type: UPDATE_TUTOR,
  payload: { id, bio, exp, lectures, times, tutoringTimes },
});

export const putTutor = (id, bio, exp, lectures) => ({
  type: PUT_TUTOR,
  payload: { id, bio, exp, lectures, times },
});
