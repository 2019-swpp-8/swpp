import { SET_USER, UNSET_USER } from './actions'

const initialState = {
  id: -1,
  username: '',
  name: '',
  loggedIn: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_USER:
      return {
        id: payload.id,
        username: payload.username,
        name: payload.name,
        loggedIn: true,
      };
    case UNSET_USER:
      return initialState;
    default:
      return state;
  }
};
