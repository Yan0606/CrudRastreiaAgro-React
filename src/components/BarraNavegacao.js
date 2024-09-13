import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const BarraNavegacao = () => {
  
  return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/dashboard">Rastreia Agro</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <NavDropdown title="Insumos" id="basic-nav-dropdown">
                <NavDropdown.Item href="/insumos">Gerenciar</NavDropdown.Item>
                <NavDropdown.Item href="#">Relatórios</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Safra" id="basic-nav-dropdown">
                <NavDropdown.Item href="/safra">Gerenciar</NavDropdown.Item>
                <NavDropdown.Item href="#">Relatórios</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Talhoes" id="basic-nav-dropdown">
                <NavDropdown.Item href="/talhoes">Gerenciar</NavDropdown.Item>
                <NavDropdown.Item href="#">Relatórios</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Maquinas" id="basic-nav-dropdown">
                <NavDropdown.Item href="/maquinas">Gerenciar</NavDropdown.Item>
                <NavDropdown.Item href="#">Relatórios</NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>);
};

export default BarraNavegacao;

