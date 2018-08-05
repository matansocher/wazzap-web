import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

import MainHeader from './Main/MainHeader';
import MainContent from './Main/MainContent';
import MainBottom from './Main/MainBottom';

import '../style/main.css';

class Main extends Component {

  deleteContactChat = () => {

  }

  render() {
    return (
      <React.Fragment>

        <div className="main-header">
          <MainHeader 
            currentChatUser={this.props.currentChatUser} 
            deleteContactChat={this.deleteContactChat} />
        </div>

        <div className="main-content">
          <MainContent 
            currentChatUser={this.props.currentChatUser} 
            currentChatMessages={this.props.currentChatMessages}
            user={this.props.user} />
        </div>

        <div className="main-bottom">
          <MainBottom />
        </div>

      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentChatUser: state.currentChatUser,
    currentChatMessages: state.currentChatMessages,
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(Main);