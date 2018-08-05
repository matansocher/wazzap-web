import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { getDateHourString, updateLastSeen } from '../actions/common_functions';
import Main from './Main';
import SideMenu from './SideMenu';
import LoadingIndicator from './common/LoadingIndicator';
import MuiThemeProvider from '../../node_modules/material-ui/styles/MuiThemeProvider';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
    // this.fetchData(user.uid);
    this.fetchData('6NXDlDWAikUjblf1TuoPPn9dQ6X2');
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload);
  }

  onUnload = e => {
    const { uid } = this.props.user;
    const lastSeen = getDateHourString();
    updateLastSeen(uid, lastSeen, () => { });
  }

  fetchData = (uid) => {
    this.setState({ loading: true }, () => {
      const lastSeen = "Online";
      this.props.actionFetchFriendsList(uid, () => {
        this.props.actionFetchUserData(uid, () => {
          // console.log("2")
          updateLastSeen(uid, lastSeen, () => {
            this.setState({ loading: false });
          })
        });
      });
    });
  }

  // preActionFetchFriendsList = (uid, callback) => {
  //   fire.database().ref(`friendships/${uid}`).on('value', friendsSnap => {
  //     let friendsArray = [];
  //     const numOfFriends = Object.keys(friendsSnap.val()).length;
  //     const friends = friendsSnap.val() || {};
  //     Object.keys(friends).map((objectkey) => {
  //       const { key, lastMessage, pinned, isUnraed, isTyping } = friends[objectkey];
  //       const friend = { key, lastMessage, pinned, isUnraed, isTyping };
  //       fire.database().ref(`users/${key}`).once('value', friendSnap => {
  //         friend.info = friendSnap.val();
  //         friendsArray.push(friend);
  //         if (friendsArray.length === numOfFriends)
  //           this.props.actionFetchFriendsListReady(friendsArray, callback)
  //       })
  //       return friend;
  //     });
  //   });
  // }

  render() {
    return (
      <MuiThemeProvider>
        <div className="top-container">
        {this.state.loading ? <LoadingIndicator /> : <span />}
          <div className="side-menu">
            <SideMenu />
          </div>
          <div className="main">
            <Main />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    contactList: state.contactList,
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(App);
