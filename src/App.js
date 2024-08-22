import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import Cadastro from './components/Cadastro';
import Agricultor from './components/Pages/Agricultor/Agricultor';
import InserirAgricultor from './components/Pages/Agricultor/InserirAgricultor';
import AlterarAgricultor from './components/Pages/Agricultor/AlterarAgricultor';
import ExcluirAgricultor from './components/Pages/Agricultor/ExcluirAgricultor';

function Login() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header>Acesso - Sistema BookSell</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Digite seu email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="senha">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" placeholder="Digite sua senha" />
                </Form.Group>

                <div className="mb-3">
                  <p>
                    Ainda não tem conta? Clique <NavLink to="/cadastrar">aqui</NavLink> para se cadastrar!
                  </p>
                </div>

                <NavLink to="/components/Home">
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
      <Route path="/components/Home" element={<Home />} />
      <Route path="/cadastrar" element={<Cadastro />} />
      <Route path="/Agricultor" element={<Agricultor />} />
      <Route path="/InserirAgricultor" element={<InserirAgricultor />} />
      <Route path="/AlterarAgricultor" element={<AlterarAgricultor />} />
      <Route path="/ExcluirAgricultor" element={<ExcluirAgricultor />} />


      {/* Outras rotas podem ser adicionadas aqui */}
    </Routes>
  </Router>
  );
}

export default App;
