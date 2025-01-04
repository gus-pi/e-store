import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const NavBar = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('AppContext.Provider is missing!');
  }

  const { userCredentials, setUserCredentials } = appContext;
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/icon.svg" alt="..." width="30" className="me-2" /> Best
          Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-dark" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          {userCredentials && userCredentials.user.role === 'admin' && (
            <DropdownButton id="dropdown-basic-button" title="Admin">
              <Dropdown.Item as={Link} to="/admin/products">
                Products
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/admin/users">
                Users
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/profile">
                Profile
              </Dropdown.Item>
              <hr />
              <Dropdown.Item
                as={Link}
                to="/"
                onClick={() => setUserCredentials(null)}
              >
                Logout
              </Dropdown.Item>
            </DropdownButton>
          )}

          {userCredentials && userCredentials.user.role !== 'admin' && (
            <DropdownButton id="dropdown-basic-button" title="Client">
              <Dropdown.Item as={Link} to="/profile">
                Profile
              </Dropdown.Item>
              <hr />
              <Dropdown.Item
                as={Link}
                to="/"
                onClick={() => setUserCredentials(null)}
              >
                Logout
              </Dropdown.Item>
            </DropdownButton>
          )}

          {!userCredentials && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="btn btn-outline-primary me-2"
                  to="/auth/register"
                  role="button"
                >
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-primary"
                  to="/auth/login"
                  role="button"
                >
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
