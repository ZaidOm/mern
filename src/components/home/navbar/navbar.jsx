import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Logo from './../../../assets/img/logo.png';
import './navbar.css';

class NavBar extends React.Component {
  render () {
    return (
        <Navbar sticky="top" bg="dark">
        <Navbar.Brand href="#home">
            <img
            alt=""
            src={Logo}
            className="d-inline-block "
            />{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Booking</Nav.Link>
            <Nav.Link href="#link">Contact</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
  }
}

export default NavBar