// sagas
export const GET_NOTIFICATION = 'GET_NOTIFICATION';

// reducers
export const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';

export const getNotification = (id) => ({
  type: GET_NOTIFICATION,
  payload: id,
});

export const updateNotification = (dat) => ({
  type: UPDATE_NOTIFICATION,
  payload: dat,
});

export const deleteNotification = (id) => ({
  type: DELETE_NOTIFICATION,
  payload: id,
});
