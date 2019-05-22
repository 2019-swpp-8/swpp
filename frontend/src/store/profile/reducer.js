import { UPDATE_PROFILE } from './actions'

const initialState = {
  id: -1,
  name: '',
  major: '',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_PROFILE:
      return {
        id: payload.id,
        name: paylod.name,
        major: payload.major,
      };
    default:
      return state;
  }
};
