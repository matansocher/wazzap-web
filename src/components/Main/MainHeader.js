import React from 'react'
import _ from 'lodash';

import MenuIcon from 'material-ui/svg-icons/navigation/more-vert';

import { getLastSeenString } from '../../actions/common_functions';

import Avatar from '../common/Avatar';


// class MainHeader extends Component {
const MainHeader = ({ currentChatUser, deleteContactChat }) => {

  deleteContactChat = () => {
    deleteContactChat(currentChatUser);
  }

  if (_.isEmpty(currentChatUser)) {
    return (
      <div>Pick a Chat</div>
    )
  }

  const { name, avatar, lastSeen, isTyping } = currentChatUser.info;

  return (
    <div className="main-header-container">

      <div className="main-header-avatar">
        <Avatar avatar={avatar} />
      </div>

      <div className="main-header-info">
        <div>{name}</div>
        {/* <div>{getLastSeenString(false, "Online")}</div> */}
        <div>{getLastSeenString(isTyping, lastSeen)}</div>
      </div>

      <div className="main-header-info-icons">
        <MenuIcon className="main-header-info-icon" />
      </div>

    </div>
  )
}

export default MainHeader;