import _ from 'lodash';
import { ADD_AS_FRIEND, SEARCH_FRIENDS } from '../actions/types';

export default function(state = [], action) {
  // let newState = state;
  switch (action.type) {
    case SEARCH_FRIENDS:
      return action.payload;
    case ADD_AS_FRIEND:
      return _.without(state, action.payload);
    default:
      return state;
  }
}
