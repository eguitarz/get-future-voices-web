const MUT_EMAIL = 'MUT_EMAIL';
const SUBMIT_EMAIL = 'SUBMIT_EMAIL';
const SUBMIT_EMAIL_SUCCESS = 'SUBMIT_EMAIL_SUCCESS';
const SUBMIT_EMAIL_FAIL = 'SUBMIT_EMAIL_FAIL';

let initState = {
  submitting: false,
  submitted: false,
  email: null
}

export default (state = initState, action = {}) => {
  switch(action.type) {
    case MUT_EMAIL:
      return {
        ...state,
        email: action.data
      }
    case SUBMIT_EMAIL:
      return {
        ...state,
        submitting: true
      };
    case SUBMIT_EMAIL_SUCCESS:
      return {
        ...state,
        submitting: false,
        submitted: true,
        email: action.data,
        error: null
      };
    case SUBMIT_EMAIL_FAIL:
      return {
        ...state,
        submitting: false,
        submitted: false,
        email: null,
        error: action.error
      };
    default:
      return state;
  }
};

export function submit() {
  return (dispatch, getState) =>
    new Promise((resolve) => 
      resolve( dispatch({
        type: SUBMIT_EMAIL
      }) )
    ).then(() => 
      dispatch(submitSuccess(getState().app.email))
    );
}

export function submitSuccess(email) {
  return {
    type: SUBMIT_EMAIL_SUCCESS,
    data: email
  }
}

export function mutEmail(event) {
  return {
    type: MUT_EMAIL,
    data: event.target.value
  }
}