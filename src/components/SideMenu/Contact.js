import React, { Component } from 'react';
import _ from 'lodash';
import Avatar from '../common/Avatar';
import UnraedBadge from '../common/UnraedBadge';

import { getLastMessageTime, getLastMessage } from '../../actions/common_functions';

import MenuIcon from 'material-ui/svg-icons/navigation/more-vert';
import PinIcon from 'material-ui/svg-icons/toggle/star-border';

import '../../style/contact.css';

class Contact extends Component {
  render() {
    const { name, avatar } = this.props.contact.info;
    const { pinned, isUnraed, isTyping } = this.props.contact;
    const { lastMessage } = this.props;
    const lastMessageTime = !_.isEmpty(lastMessage) ? getLastMessageTime(lastMessage) : " ";
    const lmContent = getLastMessage(isTyping, lastMessage || false, name);

    return (
      <div className="contact-container">

        <div className="contact-avatar">
          <Avatar avatar={avatar} />
        </div>

        <div className="contact-details">
          <div>{name}</div>
          <div>{lmContent}</div>
        </div>

        <div className="contact-actions">
          <MenuIcon className="contact-icon" />
          <UnraedBadge isUnread={isUnraed} />
          {lastMessageTime}
          {pinned ? <PinIcon className="pin-icon" /> : <span />}
        </div>

      </div>
    )
  }
}

export default Contact;