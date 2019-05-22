import { UPDATE_PROFILE } from './actions'

const initialState = {
  id: -1,
  major: '',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_PROFILE:
      return {
        id: payload.id,
        major: payload.major,
      };
    default:
      return state;
  }
};
