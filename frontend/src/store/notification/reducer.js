import { UPDATE_NOTIFICATION, DELETE_NOTIFICATION, CHECK_ALL } from './actions'

const initialState = {
  dat: {}
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_NOTIFICATION:
      return { dat: payload.dat };

    default:
      return state;
  }
};
