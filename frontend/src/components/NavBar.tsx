import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-white border-bottom box-shadow">
      <Container>
        <Navbar.Brand as={Link} to="/">
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
            <Nav.Link as={Link} to="/" className="text-dark">
              Home
            </Nav.Link>
            <Nav.Link as={Link} className="text-dark" to="/contact">
              Contact
            </Nav.Link>
          </Nav>
          <NavDropdown
            title="Admin"
            id="navbarScrollingDropdown"
            className="text-dark"
          >
            <NavDropdown.Item as={Link} to="/products">
              Products
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/profile">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/logout">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
