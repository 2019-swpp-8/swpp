import { UPDATE_PROFILE } from './actions'

const initialState = {
  id: -1,
  name: '',
  major: '',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_PROFILE:
      const res = {
        id: payload.id,
        name: payload.name,
        major: payload.major,
      };
      return res;
    default:
      return state;
  }
};
