import { UPDATE_LECTURE_LIST, SELECT_SEARCHED } from './actions'

const initialState = {
  selected: null,
  lectures: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_LECTURE_LIST:
      return { ...state, lectures: payload.lectures };
    case SELECT_SEARCHED:
      return { ...state, selected: payload.selected };
    default:
      return state;
  }
};
