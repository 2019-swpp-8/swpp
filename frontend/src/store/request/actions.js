// sagas
export const POST_REQUEST = 'POST_REQUEST';

// reducers

export const postRequest = (tutor, tutee, lecture, detail, payment, times) => ({
  type: POST_REQUEST,
  payload: { tutor, tutee, lecture, detail, payment, times},
});
