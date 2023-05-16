import {
  faBoxesPacking,
  faDoorClosed,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from 'images/kipm.svg';
import useAuthContext from 'hooks/useAuthContext';

export default function Header() {
  const { isLoggedIn, login, logout } = useAuthContext();

  return (
    <Navbar bg="light" variant="light" className="mb-4">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img height={48} src={logo} alt="KiPM" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to="/packages">
              <FontAwesomeIcon icon={faBoxesPacking} /> Packages
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/users">
              <FontAwesomeIcon icon={faUsers} /> Users
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto me-2">
            <Nav.Item>
              <Form.Control type="text" placeholder="Search for packages" />
            </Nav.Item>
          </Nav>
          <Nav>
            {isLoggedIn() ? (
              <Nav.Item onClick={logout} as={Button} variant="primary">
                <FontAwesomeIcon icon={faDoorClosed} /> Logout
              </Nav.Item>
            ) : (
              <Nav.Item onClick={login} as={Button} variant="success">
                <FontAwesomeIcon icon={faGithub} /> Login
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
