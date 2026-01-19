import React from 'react';
import { Link } from 'react-router';
import './NavBar.css';
import { Container, Nav, Navbar } from 'react-bootstrap';

function NavBar(): React.JSX.Element {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to={'/'}>
          GYMBROS
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to={'/forum'}>
            Форум
          </Nav.Link>
          <Nav.Link href="#features">Лаборотория</Nav.Link>
          <Nav.Link href="#pricing">Что-то</Nav.Link>
        </Nav>
        <Nav.Link style={{ color: 'white' }} as={Link} to={'/register'}>
          Зарегистрироваться
        </Nav.Link>

        <Nav.Link style={{ color: 'white', paddingLeft: '10px' }} as={Link} to={'/login'}>
          Войти
        </Nav.Link>
      </Container>
    </Navbar>
  );
}

export default NavBar;
