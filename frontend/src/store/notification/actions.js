// sagas
export const GET_NOTIFICATION = 'GET_NOTIFICATION';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';
export const CHECK_ALL = 'CHECK_ALL';

// reducers
export const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';



export const getNotification = (id) => ({
  type: GET_NOTIFICATION,
  payload: id,
});

export const updateNotification = (dat) => ({
  type: UPDATE_NOTIFICATION,
  payload: { dat },
});

export const deleteNotification = (noteid, userid) => ({
  type: DELETE_NOTIFICATION,
  payload: {noteid, userid},
});

export const checkAll = (id) => ({
  type: CHECK_ALL,
  payload: id,
});
