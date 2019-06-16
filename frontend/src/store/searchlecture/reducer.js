import { UPDATE_LECTURE_LIST, SELECT_SEARCHED, CHANGE_SHOW } from './actions'

const initialState = {
  show: false,
  selected: null,
  lectures: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_LECTURE_LIST:
      return { ...state, lectures: payload.lectures };
    case SELECT_SEARCHED:
      return { ...state, selected: payload.selected };
    case CHANGE_SHOW:
      return { ...state, show: payload.show };
    default:
      return state;
  }
};
