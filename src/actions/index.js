import _ from 'lodash';
import fire from '../firebase';
import {
  FETCH_AVATARS,
  SIGNUP_USER,
  LOGIN_USER,
  LOGOUT_USER,
  FETCH_USER_DATA, // fetches all user data
  FETCH_FRIENDS_LIST, // fetches the friends list of a user
  FETCH_CHAT_DATA, // when selecting contact
  UPDATE_USER_DATA, // update the user data
  SEND_MESSAGE, // send message to sender and reciever
  DELETE_MESSAGE, // delete individual message
  DELETE_CONTACT_CHAT,
  PINUNPIN_CHAT,
  UNRAED_CHAT,
  SEARCH_FRIENDS, // when trying to fetch new friends
  ADD_AS_FRIEND // when adding a friend
} from '../actions/types';

import { getAvatarsNames } from './common_functions';


export function actionFetchAvatars(callback) {
  // return dispatch => {
  //   const arrayOfAvatarsURLs = [];
  //   getAvatarsNames().forEach(name => {
  //     fire.storage().ref(`/avatars/${name}`).getDownloadURL().then(url => {
  //       arrayOfAvatarsURLs.push(url);
  //     }).catch(error => {
  //       console.log(error)
  //       return arrayOfAvatarsURLs;
  //     });
  //   });
  callback();
  return {
    type: FETCH_AVATARS,
    payload: getAvatarsNames()
  };

  // }
}

export function actionSignUpUser(email, name, avatar, uid, callback) {
  return dispatch => {
    // fire.storage().ref(`/avatars/${avatar}`).getDownloadURL().then(url => {
    fire.database().ref(`users/${uid}`).set({
      uid, email, name, avatar, lastSeen: "Online"
    }).then(() => {
      // fire.database().ref(`users/${uid}`).once('value', snap => {
      // const userFromDB = snap.val();
      const user = { uid, email, name, avatar, lastSeen: "Online" };
      dispatch({
        type: SIGNUP_USER,
        payload: user
      });
      callback();
      // });
    });
    // });
  };
}

export function actionLoginUser(uid) {
  return dispatch => {
    fire.database().ref(`users/${uid}`).once('value', snap => {
      const user = snap.val();
      dispatch({
        type: LOGIN_USER,
        payload: user
      });
    });
  }
}

export function actionLogoutUser() {
  return {
    type: LOGOUT_USER,
    payload: null
  }
}

export function actionFetchFriendsList(uid, callback) {
  let friendsArray = [];
  return dispatch => {
    fire.database().ref(`friendships/${uid}`).once('value', friendsSnap => {
      const friends = friendsSnap.val() || {};
      Object.keys(friends).map((objectkey) => {
        const { key, lastMessage, pinned, isUnraed, isTyping } = friends[objectkey];
        const friend = { key, lastMessage, pinned, isUnraed, isTyping };
        fire.database().ref(`users/${key}`).once('value', friendSnap => {
          friend.info = friendSnap.val();
          // console.log(friend)
          friendsArray.push(friend);
        })
        // .then(() => {
        //   fire.storage().ref(`/avatars/${friend.info.avatar}`).getDownloadURL().then(url => {
        //     friend.info.avatar = url;
        //     console.log("************************", friend)
        //     friendsArray.push(friend);
        //   }).catch(error => { console.log(error); });
        // });
        return friend;
      });
    }).then(() => {
      dispatch({
        type: FETCH_FRIENDS_LIST,
        payload: friendsArray
      });
      callback();
    });
  }
}

export function actionFetchFriendsListReady(friendsArray, callback) {
  return {
    type: FETCH_FRIENDS_LIST,
    payload: friendsArray
  }
}

export function actionFetchUserData(uid, callback) {
  let user = {};
  return dispatch => {
    fire.database().ref(`users/${uid}`).once('value', userSnap => {
      user = userSnap.val();
    }).then(() => {
      // fire.storage().ref(`/avatars/${user.avatar}`).getDownloadURL().then(url => {
      // user.avatar = url;
      dispatch({
        type: FETCH_USER_DATA,
        payload: user
      });
      callback();
      // });
    });
  }
}

export function actionUpdateUserData(newUser, callback) {
  // ************ also need to update email in auth ************
  const { uid, name, email, avatar, lastSeen } = newUser;
  return dispatch => {
    // fire.auth().currentUser.updateEmail("user@example.com").then(() => {

    // https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user


    // console.log(uid, name, email, avatar, lastSeen)
    fire.database().ref(`users/${uid}`).set({
      uid, name, email, avatar, lastSeen
    }).then(() => {
      dispatch({
        type: UPDATE_USER_DATA,
        payload: newUser
      });
      callback();
    });
    // }).catch(error => {
    //   console.log(error);
    // });
  }
}

export function actionSendMessage(senderuid, recieveruid, message, callback) {
  const { id, content, date, hour, sender } = message;
  return dispatch => {
    fire.database().ref(`friendships/${recieveruid}/${senderuid}/isUnraed`).once('value', isUnraed => {
      const NumOfUnraed = isUnraed.val() === "None" ? 1 : isUnraed.val() + 1;
      const updates = {};
      updates[`friendships/${recieveruid}/${senderuid}/isUnraed`] = NumOfUnraed;
      updates[`messages/${senderuid}/${recieveruid}/${id}`] =
        { id, content, date, hour, sender };
      updates[`messages/${recieveruid}/${senderuid}/${id}`] =
        { id, content, date, hour, sender };
      updates[`friendships/${senderuid}/${recieveruid}/lastMessage`] =
        { id, content, date, hour, sender };
      updates[`friendships/${recieveruid}/${senderuid}/lastMessage`] =
        { id, content, date, hour, sender };
      fire.database().ref().update(updates).then(() => {
        dispatch({
          type: SEND_MESSAGE,
          payload: message
        });
        callback();
      });
    });
  }
}

export function actionDeleteMessage(senderuid, recieveruid, message, callback) {
  return dispatch => {
    fire.database().ref(`messages/${senderuid}/${recieveruid}/${message.id}`).remove().then(() => {
      fire.database().ref(`friendships/${senderuid}/${recieveruid}/lastMessage`).remove().then(() => {
        dispatch({
          type: DELETE_MESSAGE,
          payload: message
        });
        callback();
      });
    })
  }
}

export function actionFetchChatData(useruid, contact, callback) {
  const chatData = { contact, messages: [] };
  const contactuid = contact.info.uid;
  return dispatch => {
    fire.database().ref(`messages/${useruid}/${contactuid}`).once('value', messagesSnap => {
      const messages = messagesSnap.val();
      chatData.messages = messages;
    }).then(() => {
      dispatch({
        type: FETCH_CHAT_DATA,
        payload: chatData
      });
      callback();
    });
  }
}

export function actionFetchChatDataReady(chatData, callback) {
  return {
    type: FETCH_CHAT_DATA,
    payload: chatData
  }
}

export function actionDeleteContactChat(useruid, contact, callback) {
  const contactuid = contact.key;
  // console.log(useruid, contact, contactuid)
  return dispatch => {
    fire.database().ref(`messages/${useruid}/${contactuid}`).remove().then(() => {
      fire.database().ref(`friendships/${useruid}/${contactuid}`).remove().then(() => {
        dispatch({
          type: DELETE_CONTACT_CHAT,
          payload: contact
        });
        callback();
      });
    });
    // dispatch({
    //   type: DELETE_CONTACT_CHAT,
    //   payload: contact
    // });
    // callback();
  }
}

export function actionPinUnpinChat(useruid, contact, isPinned, callback) {
  // console.log(contact)
  return dispatch => {
    const updates = {};
    updates[`friendships/${useruid}/${contact.info.uid}/pinned`] = isPinned;
    fire.database().ref().update(updates).then(() => {
      
      // console.log(JSON.stringify(contact))
      dispatch({
        type: PINUNPIN_CHAT,
        payload: contact
      });
      callback();
    });
  }
}

export function actionSearchFriends(uid, friendsUids, callback) {
  return dispatch => {
    fire.database().ref(`users`).once('value', snap => {
      const users = snap.val();
      const notFriends = [];
      _.map(users, u => {
        if (!_.includes(friendsUids, u.uid)) {
          notFriends.push(u);
        }
      })
      console.log(notFriends)
      dispatch({
        type: SEARCH_FRIENDS,
        payload: notFriends
      });
      callback();
    });
  }
}

export function actionAddAsFriend(useruid, contact, callback) {
  const contactuid = contact.uid;
  return dispatch => {
    fire.database().ref(`friendships/${useruid}/${contactuid}`).set({
      key: contactuid, pinned: false, isUnraed: "None", isTyping: false
    }).then(() => {
      fire.database().ref(`friendships/${contactuid}/${useruid}`).set({
        key: useruid, pinned: false, isUnraed: "None", isTyping: false
      }).then(() => {
        dispatch({
          type: ADD_AS_FRIEND,
          payload: contact
        });
        callback();
      });
    });
  }
}

export function actionMarkUnraed(useruid, contact, callback) {
  const contactuid = contact.info.uid;
  return dispatch => {
    const updates = {};
    updates[`friendships/${useruid}/${contactuid}/isUnraed`] = 0;
    fire.database().ref().update(updates).then(() => {
      dispatch({
        type: UNRAED_CHAT,
        payload: contact
      });
      callback();
    });;
  }
}