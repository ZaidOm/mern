import React from 'react';
import {Menu} from 'semantic-ui-react';
import './sidebarheader.scss';

export function SideBarHeader(props) {
  const heading = props.image;
  return (
    <Menu.Item>
      <Menu.Header className='side-bar-header'>
        <img className='side-bar-image' src={heading} alt='sidebarheaderimage'/>
      </Menu.Header>
    </Menu.Item>
  );
}