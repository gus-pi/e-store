import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-white border-bottom box-shadow">
      <Container>
        <Navbar.Brand href="#">
          <img src="/icon.svg" alt="logo" width="30px" className="me-2" />
          E-STORE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" className="text-dark">
              Home
            </Nav.Link>
            <Nav.Link className="text-dark" href="#action2">
              Contact
            </Nav.Link>
          </Nav>
          <NavDropdown
            title="Admin"
            id="navbarScrollingDropdown"
            className="text-dark"
          >
            <NavDropdown.Item href="#action3">Products</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
