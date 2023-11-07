import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <>
      <Navbar expand="lg" className="footer" fixed="bottom">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className='credits'>©2022 Daire Hardesty | All Rights Reserved</Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Footer;