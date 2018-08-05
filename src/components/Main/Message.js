import React, { Component } from 'react';
import { getCorrectHour } from '../../actions/common_functions';
import Avatar from '../common/Avatar';
import Divider from 'material-ui/Divider';
import '../../style/message.css';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  deleteMessage = () => {
    this.props.deleteMessage(this.props.message);
  }

  render() {
    let { content, hour, sender } = this.props.message;
    const { user, currentChatUser } = this.props;
    const name = sender === user.uid ? user.name : currentChatUser.info.name;
    const avatar = sender === user.uid ? user.avatar : currentChatUser.info.avatar;
    hour = getCorrectHour(hour);
    const bgColor = sender === user.uid ? "#000000" : "#ffffff";
    return (
      // <div className="message" style={`background-color: ${bgColor};`}>
      <div className="message">
        <div className="message-avatar">
          <Avatar avatar={avatar} />
        </div>

        <div className="message-name">
          {name}
        </div>

        <br />

        <div className="message-content">
          {content}
        </div>

        <div>
          <span className="time-of-message">{hour}</span>
          {sender === this.props.user.uid ?
            <span className="message-V">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076">
                <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7" />
              </svg>
            </span>
            : <span />}
        </div>
        <Divider />
      </div>
    );
  }
}



export default Message;