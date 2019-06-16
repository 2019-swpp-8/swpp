import { UPDATE_TUTOR } from './actions'

const initialState = {
  id: -1,
  bio: '',
  exp: '',
  lectures: [],
  times: {
    mon: 0,
    tue: 0,
    wed: 0,
    thu: 0,
    fri: 0,
    sat: 0,
    sun: 0,
  },
  tutoringTimes: {
    mon: 0,
    tue: 0,
    wed: 0,
    thu: 0,
    fri: 0,
    sat: 0,
    sun: 0,
  }
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_TUTOR:
      const res = {
        id: payload.id,
        bio: payload.bio,
        exp: payload.exp,
        lectures: payload.lectures,
        times: payload.times,
        tutoringTimes: payload.tutoringTimes,
      };
      return res;
    default:
      return state;
  }
};
