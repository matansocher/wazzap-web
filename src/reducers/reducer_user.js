// import _ from 'lodash';
import { SIGNUP_USER, LOGIN_USER, LOGOUT_USER, FETCH_USER_DATA, UPDATE_USER_DATA } from '../actions/types';

export default function(state = {}, action) {
  // let newState = state;
  switch (action.type) {
    case FETCH_USER_DATA:
      return action.payload;
    case SIGNUP_USER:
      return action.payload;
    case LOGIN_USER:
      return action.payload;
    case LOGOUT_USER:
      return null;
    case UPDATE_USER_DATA:
      return action.payload;
    default:
      return state;
  }
}
