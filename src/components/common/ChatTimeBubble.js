import React from 'react';
import { getLastMessageTime } from '../../actions/common_functions'

const ChatTimeBubble = ({ nextMessage }) => {
  let lastTime = getLastMessageTime(nextMessage);
  lastTime = lastTime.includes(":") ? "Toady" : lastTime;
  return (
    <div key={nextMessage.date} className="day-indicator">
      {lastTime}
    </div>
  )
}

export default ChatTimeBubble;