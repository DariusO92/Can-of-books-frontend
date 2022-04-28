import React from 'react';
import './Footer.css';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return (
      <Navbar className="footer-bar" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Code Fellows</Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;
