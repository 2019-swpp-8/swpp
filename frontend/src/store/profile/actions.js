// sagas
export const GET_PROFILE = 'GET_PROFILE';

// reducers
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const getProfile = (id) => ({
  type: GET_PROFILE,
  payload: id,
});

export const updateProfile = (id, name, major) => ({
  type: UPDATE_PROFILE,
  payload: { id, name, major },
});
