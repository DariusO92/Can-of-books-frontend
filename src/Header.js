import React from 'react';
import './Header.css';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <>
      <Navbar className="header-bar" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem>
        <NavItem><Link to="/about" className="nav-link">About</Link></NavItem>
        {/* ^adds about link on nav bar in the header */}
      </Navbar>
        </>
    )
  }
}

export default Header;
