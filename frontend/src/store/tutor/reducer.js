import { UPDATE_TUTOR } from './actions'

const initialState = {
  id: -1,
  bio: '',
  exp: '',
  lectures: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_TUTOR:
      const res = {
        id: payload.id,
        bio: payload.bio,
        exp: payload.exp,
        lectures: payload.lectures,
      };
      return res;
    default:
      return state;
  }
};
