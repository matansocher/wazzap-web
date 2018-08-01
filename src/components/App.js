import React, { Component } from 'react';
import Main from './Main';
import SideMenu from './SideMenu';

class App extends Component {
  render() {
    return (
      <div className="top-container">
        <div className="side-menu">
          <SideMenu />
        </div>
        <div className="main">
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
