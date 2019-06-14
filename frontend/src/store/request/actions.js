// sagas
export const POST_REQUEST = 'POST_REQUEST';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const CHANGE_REQUEST_STATUS = 'CHANGE_REQUEST_STATUS';

// reducers

export const postRequest = (tutor, tutee, lecture, detail, payment, times) => ({
  type: POST_REQUEST,
  payload: { tutor, tutee, lecture, detail, payment, times },
});

export const deleteRequest = (request_id, user_id) => ({
  type: DELETE_REQUEST,
  payload: { request_id, user_id },
});

export const changeRequestStatus = (request_id, status, user_id) => ({
  type: CHANGE_REQUEST_STATUS,
  payload: { request_id, status, user_id },
});
