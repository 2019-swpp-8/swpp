// sagas
export const GET_REQUEST_LIST = 'GET_REQUEST_LIST';

// reducers
export const UPDATE_REQUEST_LIST = 'UPDATE_REQUEST_LIST';

export const getRequestList = (id) => ({
  type: GET_REQUEST_LIST,
  payload: { id },
});

export const updateRequestList = (tutor_request, tutee_request) => ({
  type: UPDATE_REQUEST_LIST,
  payload: { tutor_request, tutee_request },
});
