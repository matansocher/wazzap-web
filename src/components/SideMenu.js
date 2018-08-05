import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

import SideMenuHeader from './SideMenu/SideMenuHeader';
import SideMenuContacts from './SideMenu/SideMenuContacts';

import '../style/side-menu.css';

class SideMenu extends Component {

  navigateToRoute = (route) => {
    this.props.history.push(route);
  }

  searchContact = (searchTerm) => {
    this.setState({ searchTerm });
  }
  
  render() {
    return (
      <div className="side-menu-header">
        <SideMenuHeader
          searchContact={this.searchContact}
          navigateToRoute={this.navigateToRoute} />
        <SideMenuContacts />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    contactList: state.contactList,
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(SideMenu);