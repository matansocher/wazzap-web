import React, { Component } from 'react';

import SearchIcon from 'material-ui/svg-icons/action/search';
import MenuIcon from 'material-ui/svg-icons/navigation/more-vert';

import Avatar from '../common/Avatar';

class SideMenuHeader extends Component {
  render() {
    return (
      <div className="side-menu-header">
        
        <div className="side-menu-info-container">
          <div className="side-menu-info-avatar">
            <Avatar avatar={'contact3.png'} />
          </div>
          <div className="side-menu-info-details">
            <div>Matan</div>
          </div>
          <div className="side-menu-info-icons">
            <MenuIcon className="side-menu-info-icon" />
          </div>
        </div>

        <div className="side-menu-search-container">
          <SearchIcon className="side-menu-search-icon" />
          <input 
            className="side-menu-search" 
            placeholder="Search or start new chat" />
        </div>

      </div>
    )
  }
}

export default SideMenuHeader;