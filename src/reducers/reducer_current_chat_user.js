// import _ from 'lodash';
import { FETCH_CHAT_DATA } from '../actions/types';

export default function(state = {}, action) {
  // let newState = state;
  switch (action.type) {
    case FETCH_CHAT_DATA:
      return action.payload.contact;
    default:
      return state;
  }
}
