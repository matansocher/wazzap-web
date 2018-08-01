import { combineReducers } from 'redux';
import User from './reducer_user';
import ContactList from './reducer_contact_list';
import CurrentChatUser from './reducer_current_chat_user';
import CurrentChatMessages from './reducer_current_chat_messages';
import SearchFriends from './reducer_search_friends';
import Avatars from './reducer_avatars';

const rootReducer = combineReducers({
  user: User,
  contactList: ContactList,
  currentChatUser: CurrentChatUser,
  currentChatMessages: CurrentChatMessages,
  searchFriends: SearchFriends,
  avatars: Avatars
});

export default rootReducer;