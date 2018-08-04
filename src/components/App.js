import React, { Component } from 'react';
import Main from './Main';
import SideMenu from './SideMenu';
import MuiThemeProvider from '../../node_modules/material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="top-container">
          <div className="side-menu">
            <SideMenu />
          </div>
          <div className="main">
            <Main />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
