import React from 'react'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export class Sidebar extends React.Component{
  constructor() {
    super();
    this.state = {
      selected: 'home',
      loggedOut: false
    };
  }
  onSelect = (selected) => {
    this.setState({ selected: selected });
  };

  isLoggedOut() {
    this.setState({
      loggedOut: true
    })
    return this.state.loggedOut;
  }

  render() {
    if (this.selected === 'logout')
    {
      this.isLoggedOut();
    }
    return (
    <SideNav
    onSelect={this.onSelect}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
              <NavIcon>
                  <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                  Home
              </NavText>
          </NavItem>
          <NavItem eventKey="logout">
              <NavIcon>
                  <i className="fa fa-sign-out" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                  Logout
              </NavText>
          </NavItem>
      </SideNav.Nav>
  </SideNav>
    )
  }
}

export default Sidebar