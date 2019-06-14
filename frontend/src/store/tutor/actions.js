// sagas
export const GET_TUTOR = 'GET_TUTOR';
export const PUT_TUTOR = 'PUT_TUTOR';

// reducers
export const UPDATE_TUTOR = 'UPDATE_TUTOR';

export const getTutor = (id) => ({
  type: GET_TUTOR,
  payload: id,
});

export const updateTutor = (id, bio, exp) => ({
  type: UPDATE_TUTOR,
  payload: { id, bio, exp },
});

export const putTutor = (id, bio, exp) => ({
  type: PUT_TUTOR,
  payload: { id, bio, exp },
});
