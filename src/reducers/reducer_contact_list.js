import _ from 'lodash';
import {
  LOGOUT_USER, DELETE_CONTACT_CHAT, FETCH_FRIENDS_LIST, PINUNPIN_CHAT, UNRAED_CHAT
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_FRIENDS_LIST:
      return action.payload;
    case DELETE_CONTACT_CHAT:
      return _.without(state, action.payload);
    case PINUNPIN_CHAT:
      state[_.findIndex(state, { key: action.payload.key })] = action.payload;
      return state.slice();
    case UNRAED_CHAT:
      state[_.findIndex(state, { key: action.payload.key })] = action.payload;
      return state;
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
}
