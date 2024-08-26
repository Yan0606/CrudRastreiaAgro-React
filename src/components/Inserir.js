import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavbarComp from './NavbarComp';

const Inserir = ({ adicionarAgricultor }) => {
  const [formData, setFormData] = useState({
    id: '',
    nomeAgricultor: '',
    email: '',
    senha: '',
    cpf: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarAgricultor(formData);
    navigate('/GerenciamentoAgricultor');
  };

  return (
    <div>
      <NavbarComp />
      <div className="container mt-5">
        <h2>Inserir Novo Agricultor</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="id">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Digite o ID do agricultor"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="nomeAgricultor">
            <Form.Label>Nome do Agricultor</Form.Label>
            <Form.Control
              type="text"
              name="nomeAgricultor"
              value={formData.nomeAgricultor}
              onChange={handleChange}
              placeholder="Digite o nome do agricultor"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite o email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="senha">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Digite a senha"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="cpf">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="Digite o CPF"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">Inserir</Button>
        </Form>
      </div>
    </div>
  );
};

export default Inserir;
