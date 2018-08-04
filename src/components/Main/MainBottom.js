import React, { Component } from 'react';

import SmileyIcon from 'material-ui/svg-icons/social/mood';
import SendIcon from 'material-ui/svg-icons/content/send';

class MainBottom extends Component {
  render() {
    return (
        <div className="main-bottom-container">

          <div className="main-bottom-smiley-div">
            <SmileyIcon onClick={this.toggleSmiley} style={{ width: 30, height: 30 }} />
          </div>

          <div className="main-bottom-input-div">
            <input className="main-bottom-input" />
          </div>

          <div className="main-bottom-send-div">
            <SendIcon style={{ width: 30, height: 30 }} />
          </div>

        </div>
    )
  }
}

export default MainBottom;

    // {this.state.smileyShow ?
    //   <Picker onSelect={this.addEmojiToMessage}
    //     style={{ position: 'relative', width: '100%' }} />
    //   : <span />}
    // <div className="smiley">
    //   <SmileyIcon onClick={this.toggleSmiley} className="pull-left" />
    // </div>

    // <form ref={el => this.messageForm = el} onSubmit={this.submitMessage}>
    //   <div className="center">
    //     <textarea value={this.state.message} id="message" 
    //       onKeyDown={this.onEnterPress}
    //       name="message" rows="1"
    //       className="form-control input-message"
    //       placeholder="Type a message" onChange={this.handleChange}>
    //     </textarea>
    //   </div>
    //   <div className="send-icon">
    //     <input id="sendBtn" className="pull-right" type="submit">
    //     <SendIcon />
    //     </input>
    //   </div>
    // </form>