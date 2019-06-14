import { UPDATE_REQUEST_LIST } from './actions'

const initialState = {
  tutor_request: {},
  tutee_request: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_REQUEST_LIST:
      return { tutor_request: payload.tutor_request, tutee_request: payload.tutee_request };
    default:
      return state;
  }
};
