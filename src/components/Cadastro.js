import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Cadastro() {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Header>Cadastro - Sistema BookSell</Card.Header>
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

                                <Form.Group className="mb-3" controlId="nivel">
                                    <Form.Label>Nível</Form.Label>
                                    <Form.Control as="select" defaultValue="Funcionário">
                                        <option>Funcionário</option>
                                        <option>Administrador</option>
                                        {/* Outras opções de nível podem ser adicionadas aqui */}
                                    </Form.Control>
                                </Form.Group>

                                <div className="mb-3">
                                    <p>
                                        Já tem conta? Clique <NavLink to="/">aqui</NavLink> para acessar!
                                    </p>
                                </div>

                                <Button variant="primary" type="submit">Cadastrar</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Cadastro;
