import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import _ from 'lodash';
import { sortContactsByLastMessageTime, filterBySearch, splitToPinned } from '../../actions/common_functions';

import Contact from './Contact';
import LoadingIndicator from '../common/LoadingIndicator';

import FlatButton from 'material-ui/FlatButton';
import { List } from 'material-ui/List';

class SideMenuContacts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      gesture: false,
      gestureText: "",
      loading: false
    }
  }

  componentDidMount() {
    
  }

  // fetchData = (uid) => {
  //   this.setState({ loading: true }, () => {
  //     const lastSeen = "Online";
  //     this.props.actionFetchFriendsList(uid, () => {
  //       this.props.actionFetchUserData(uid, () => {
  //         // console.log("2")
  //         updateLastSeen(uid, lastSeen, () => {
  //           this.setState({ loading: false });
  //         })
  //       });
  //     });
  //   });
  // }

  fetchChatData = (contact) => {
    this.setState({ loading: true }, () => {
      const useruid = this.props.user.uid;
      this.props.actionFetchChatData(useruid, contact, () => {
        this.setState({ loading: false })
      });
    })
  }

  renderContacts() {
    if (_.isEmpty(this.props.contactList) && !this.state.loading) {
      if (!this.state.loading) {
        return (
          <div className="center">
            <h3>You have no conversations yet</h3>
            <FlatButton label="Find Friends" primary={true} />
          </div>
        );
      } else
        return (<span />);
    }
    let contacts = _.values(this.props.contactList);
    if (this.state.searchTerm !== '' && contacts && !_.isEmpty(contacts))
      contacts = filterBySearch(contacts, this.state.searchTerm);
    contacts = sortContactsByLastMessageTime(contacts);
    contacts = splitToPinned(contacts);
    return (
      contacts.map(contact => 
        <Contact key={contact.info.email}
          contact={contact}
          lastMessage={contact.lastMessage}
          fetchChatData={this.fetchChatData}
          deleteContactChat={this.deleteContactChat}
          pinUnpinChat={this.pinUnpinChat}
          markAsUnraed={this.markAsUnraed} />
      )
    );
  }

  render() {
    return (
      <div className="side-menu-contacts">
        {this.state.loading ? <LoadingIndicator /> : <span />}
        <List>
          {this.renderContacts()}
        </List>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    contactList: state.contactList,
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(SideMenuContacts);