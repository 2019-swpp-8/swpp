import { UPDATE_TUTOR } from './actions'

const initialState = {
  id: -1,
  bio: '',
  exp: '',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_TUTOR:
      const res = {
        id: payload.id,
        bio: payload.bio,
        exp: payload.exp,
      };
      return res;
    default:
      return state;
  }
};
