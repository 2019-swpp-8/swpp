// sagas
export const CHECK_USER = 'CHECK_USER';

// reducers
export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

export const checkUser = () => ({ type: CHECK_USER });
export const setUser = (id, username) => ({
  type: SET_USER,
  payload: { id, username },
});
export const unsetUser = () => ({ type: UNSET_USER });
