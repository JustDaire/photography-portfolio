import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const navItems = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'About',
    link: '/about',
  },
  {
    label: 'Gallery',
    link: '/gallery',
  },
  {
    label: 'Portfolio',
    link: '/portfolio',
  },
  {
    label: 'Services',
    link: '/services',
  },
  {
    label: 'Blog',
    link: '/blog',
  },
  {
    label: 'Contact',
    link: '/contact',
  },
  {
    label: 'Admin',
    link: '/admin',
  },
];

function Header() {
  return (
    <>
      <header>
        <Navbar expand="lg" className='p-0'>
          <Navbar.Brand className='logo-container p-0'>
            <Link to={'/'} className="nav-link">
              <img
                alt="Daire Hardesty"
                src="/daire-hardesty-logo.png"
                height="60"
                className="d-inline-block align-top"
              /></Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              {navItems.map(item => (
                <Nav.Link><Link to={item.link} className="nav-link">{item.label.toUpperCase()}</Link></Nav.Link>
                // <Link to={'/'} className="nav-link">Home</Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </>
  );
}

export default Header;