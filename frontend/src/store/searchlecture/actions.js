// sagas
export const GET_LECTURE_LIST = 'GET_LECTURE_LIST';

// reducers
export const UPDATE_LECTURE_LIST = 'UPDATE_LECTURE_LIST';
export const SELECT_SEARCHED = 'SELECT_SEARCHED';
export const CHANGE_SHOW = 'CHANGE_SHOW';

export const getLectureList = (keyword) => ({
  type: GET_LECTURE_LIST,
  payload: { keyword },
});

export const updateLectureList = (lectures) => ({
  type: UPDATE_LECTURE_LIST,
  payload: { lectures },
});

export const selectSearched = (selected) => ({
  type: SELECT_SEARCHED,
  payload: { selected },
});

export const changeShow = (show) => ({
  type: CHANGE_SHOW,
  payload: { show },
});
