import React from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom";
import {SideBarItem} from './sidebaritem/sidebaritem.jsx';
import {SideBarHeader} from './sidebarheader/sidebarheader';
import {SideBarFooter} from './sidebarfooter/sidebarfooter';
import {Menu} from 'semantic-ui-react';

import LogoReverse from './../../assets/logoreverse.png';
import auth from "./../auth/auth.user";
import { deleteFromStorage } from "./../../utils/storage";
import './sidebar.scss';

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      toLogin: false,
      token: props.token,
    };
  }

  change = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  };

  submitLogout(){
    axios
      .get(
        "http://localhost:5000/users/logout?token=" + this.state.token,
      )
      .then(response => {
        if (response.data.success === true) {
          auth.logout(() => {
            this.setState({
              toLogin: true
            });
            deleteFromStorage("token",this.state.token);
          });
        }
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    if (this.state.toLogin === true)
    {
        return <Redirect to='/' />
    }
    return (
    <Menu borderless vertical stackable fixed='left' className='side-nav'>
      <SideBarHeader image={LogoReverse}/>
        <SideBarItem highlight={true}  label='Home' icon='fa fa-home'/>
        <SideBarItem label='Settings' icon='fa fa-cog'/>
        <SideBarItem label='Logout' icon='fa fa-sign-out' onClick={() => this.submitLogout()}/>
        <SideBarFooter/>
      </Menu>
    );
  }
}