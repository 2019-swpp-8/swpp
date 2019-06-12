// sagas
export const GET_PROFILE = 'GET_PROFILE';

// reducers
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const PUT_PROFILE = 'PUT_PROFILE';

export const getProfile = (id) => ({
  type: GET_PROFILE,
  payload: id,
});

export const updateProfile = (id, name, major, tutor) => ({
  type: UPDATE_PROFILE,
  payload: { id, name, major, tutor },
});

export const putProfile = (id, name, major) => ({
  type: PUT_PROFILE,
  payload: { id, name, major },
});
