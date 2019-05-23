// sagas
export const GET_TUTOR_LIST = 'GET_TUTOR_LIST';

// reducers
export const UPDATE_TUTOR_LIST = 'UPDATE_TUTOR_LIST';

export const getTutorList = (bio, exp) => ({
  type: GET_TUTOR_LIST,
  payload: {bio, exp},
});

export const updateTutorList = (dat) => ({
  type: UPDATE_TUTOR_LIST,
  payload: { dat },
});