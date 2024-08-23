import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cadastro from './components/Cadastro';
import Home from './components/Home';
import GerenciamentoAgricultor from './components/GerenciamentoAgricultor';
import Inserir from './components/Inserir';
import EditarAgricultor from './components/EditarAgricultor';
import ExcluirAgricultor from './components/ExcluirAgricultor';


function Login() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header>Acesso - Sistema BookSell</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="email">aa
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Digite seu email" />
                </Form.Group> 
                <Form.Group className="mb-3" controlId="senha">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" placeholder="Digite sua senha" />
                </Form.Group>

                <div className="mb-3">
                  <p>
                    Ainda não tem conta? Clique <NavLink to="/Cadastro">aqui</NavLink> para se cadastrar!
                  </p>
                </div>

                <NavLink to="/Home">
                  <Button variant="primary">Acessar</Button>
                </NavLink>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/GerenciamentoAgricultor" element={<GerenciamentoAgricultor />} />
        <Route path="/Inserir" element={<Inserir />} />
        <Route path="/EditarAgricultor" element={<EditarAgricultor />} />
        <Route path="/ExcluirAgricultor" element={<ExcluirAgricultor />} />
      </Routes>
    </Router>
  );
}

export default App;