import React, { Component } from 'react';
import MainHeader from './Main/MainHeader';
import MainContent from './Main/MainContent';
import MainBottom from './Main/MainBottom';

import '../style/main.css';

class Main extends Component {
  render() {
    return (
      <React.Fragment>

        <div className="main-header">
          <MainHeader currentChatUser={{ a: 4 }} deleteContactChat={() => { }} />
        </div>

        <div className="main-content">
          <MainContent />
        </div>

        <div className="main-bottom">
          <MainBottom />
        </div>

      </React.Fragment>
    )
  }
}

export default Main;