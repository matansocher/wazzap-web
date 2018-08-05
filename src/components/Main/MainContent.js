import React, { Component } from 'react'
import _ from 'lodash';

import Message from './Message';
import ChatTimeBubble from '../common/ChatTimeBubble';
import LoadingIndicator from '../common/LoadingIndicator';

class MainContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gesture: false,
      gestureText: "",
      loading: false
    }
  }

  componentDidMount() {
    this.scrollToBottom();
    if (!_.isEmpty(this.props.user)) {
      const useruid = this.props.user.uid;
      const contactid = this.props.currentChatUser.info.uid;
      // raedMessage(useruid, contactid);
      // this.preActionFetchChatData(useruid, this.props.currentChatUser, () => {})
      // this.props.actionMarkRaedUnraed(useruid, contact, "None", () => {});
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    // this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  renderMessages() {
    let messages = this.props.currentChatMessages;
    if (!messages || messages.length === 0) {
      return <span />;
    }
    return (
      messages.map((message, index, messages) => {
        if (message && message.content !== " ") {
          let arrayToReturn = [];
          if (index !== messages.length - 1) { // not the last message
            if(message.date !== messages[index + 1].date) {
              arrayToReturn.push(
                <ChatTimeBubble 
                  key={`${message.id}bubble`} 
                  nextMessage={messages[index + 1]} />
                );
            }
          }
          arrayToReturn.push(
            <Message key={message.id} 
              message={message}
              user={this.props.user} 
              currentChatUser={this.props.currentChatUser}
              deleteMessage={this.deleteMessage} />
          );
          return arrayToReturn;
        }
        return <span key={1} />
      })
    );
  }

  render() {
    if (_.isEmpty(this.props.currentChatUser)) {
      return (
        <div>Pick a Chat</div>
      )
    }
    return (
      <div id="scrollable-conversation" className="scrollable-conversation">
        {this.state.loading ? <LoadingIndicator /> : <span />}
        {this.renderMessages()}

        <div style={{ float: "left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
    )
  }
}

export default MainContent;