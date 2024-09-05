import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const BarraNavegacao = () => {
  
  return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Livros" id="basic-nav-dropdown">
                <NavDropdown.Item href="/livros">Gerenciar</NavDropdown.Item>
                <NavDropdown.Item href="#">Relatórios</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>);
};

export default BarraNavegacao;

