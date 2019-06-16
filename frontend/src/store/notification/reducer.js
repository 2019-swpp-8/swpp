import { UPDATE_NOTIFICATION, DELETE_NOTIFICATION } from './actions'

const initialState = {
  dat: {}
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_NOTIFICATION:
      return { dat: payload.dat };
    case DELETE_NOTIFICATION:
      state.dat.map(t =>
        chk(t, payload.id)
      )
    default:
      return state;
  }
};

const chk = (t, id) => {
  if(t.id == id){
    return null
  }else{
    return t
  }
}
