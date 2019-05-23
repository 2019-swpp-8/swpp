import { UPDATE_TUTOR_LIST } from './actions'

const initialState = {
  dat: {}
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_TUTOR_LIST:
      return { dat: payload.dat };
    default:
      return state;
  }
};
