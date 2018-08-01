import React, { Component } from 'react';
import MainHeader from './Main/MainHeader';
import MainContent from './Main/MainContent';
import MainBottom from './Main/MainBottom';

class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <MainHeader />
        <MainContent />
        <MainBottom />
      </React.Fragment>
    )
  }
}

export default Main;