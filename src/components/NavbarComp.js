import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

function NavbarComp() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">RastreiaAgro</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Agricultor" id="agricultor-dropdown">
                            <NavDropdown.Item href="/GerenciamentoAgricultor">Gerenciar agricultor</NavDropdown.Item>
                            <NavDropdown.Item href="#relatorio-agricultor">Relatório de agricultor</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Propriedade" id="propriedade-dropdown">
                            <NavDropdown.Item href="#gerenciar-propriedade">Gerenciar propriedade</NavDropdown.Item>
                            <NavDropdown.Item href="#relatorio-propriedade">Relatório de propriedade</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Produtos" id="produtos-dropdown">
                            <NavDropdown.Item href="#gerenciar-produtos">Gerenciar produtos</NavDropdown.Item>
                            <NavDropdown.Item href="#relatorio-produtos">Relatório de produtos</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Máquinas" id="maquinas-dropdown">
                            <NavDropdown.Item href="#gerenciar-maquinas">Gerenciar máquinas</NavDropdown.Item>
                            <NavDropdown.Item href="#relatorio-maquinas">Relatório de máquinas</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Talhões" id="talhoes-dropdown">
                            <NavDropdown.Item href="#gerenciar-talhoes">Gerenciar talhões</NavDropdown.Item>
                            <NavDropdown.Item href="#relatorio-talhoes">Relatório de talhões</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Cultura" id="cultura-dropdown">
                            <NavDropdown.Item href="#gerenciar-cultura">Gerenciar cultura</NavDropdown.Item>
                            <NavDropdown.Item href="#relatorio-cultura">Relatório de cultura</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Safra" id="safra-dropdown">
                            <NavDropdown.Item href="#gerenciar-safra">Gerenciar safra</NavDropdown.Item>
                            <NavDropdown.Item href="#relatorio-safra">Relatório de safra</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link to="../App.js">Sair</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComp;
