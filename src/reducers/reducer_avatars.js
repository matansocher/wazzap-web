// import _ from 'lodash';
import { FETCH_AVATARS } from '../actions/types';

export default function(state = [], action) {
  // let newState = state;
  switch (action.type) {
    case FETCH_AVATARS:
      return action.payload;
    default:
      return state;
  }
}
