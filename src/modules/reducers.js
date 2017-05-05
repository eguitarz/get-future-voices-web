let firebase = require('firebase/app');
require("firebase/auth");
require("firebase/database");
require("firebase/storage");

let config = {
  apiKey: "AIzaSyCW7Ce8GRrwuzWF61hm45IhTllD8dJYtnU",
  authDomain: "future-voice-web.firebaseapp.com",
  databaseURL: "https://future-voice-web.firebaseio.com",
  projectId: "future-voice-web",
  storageBucket: "future-voice-web.appspot.com",
  messagingSenderId: "213344696856"
};

firebase.initializeApp(config);
let database = firebase.database();

const MUT_EMAIL = 'MUT_EMAIL';
const SUBMIT_EMAIL = 'SUBMIT_EMAIL';
const SUBMIT_EMAIL_SUCCESS = 'SUBMIT_EMAIL_SUCCESS';
const SUBMIT_EMAIL_FAIL = 'SUBMIT_EMAIL_FAIL';
const SIGNED_IN = 'SIGNED_IN';
const SIGNED_OUT = 'SIGNED_OUT';

let initState = {
  submitting: false,
  submitted: false,
  email: null,
  user: null
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
    case SIGNED_IN:
      return {
        ...state,
        user: action.data
      };
    case SIGNED_OUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

export function submit(email) {
  return (dispatch) => {
    let newContact = database.ref('contacts').push();
    return newContact.set({
      email: email,
      timestamp: (new Date()).toISOString()
    }).then(() => dispatch(submitSuccess(email))
    ).catch(error => dispatch({
      type: SUBMIT_EMAIL_FAIL,
      error: error
    }))
    ;
  }
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

export function signIn(email, password) {
  return dispatch => 
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
      return dispatch({
        type: SIGNED_IN,
        data: user
      }); 
    }).catch(function(error) {
      return dispatch({
        type: SIGNED_OUT,
        data: null
      }); 
    }); 
}

export function signOut() {
  return dispatch => 
    firebase.auth().signOut().then(function() {
      return dispatch({
        type: SIGNED_OUT
      }); 
    }).catch(function(error) {

    }); 
}