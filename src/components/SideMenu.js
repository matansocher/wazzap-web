import React, { Component } from 'react';

import SideMenuHeader from './SideMenu/SideMenuHeader';
import SideMenuContacts from './SideMenu/SideMenuContacts';

class SideMenu extends Component {
  render() {
    return (
      <div className="side-menu-header">
        <SideMenuHeader />
        <SideMenuContacts />
      </div>
    )
  }
}

export default SideMenu;