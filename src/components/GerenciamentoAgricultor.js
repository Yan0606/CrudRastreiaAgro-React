import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavbarComp from './NavbarComp';

function GerenciamentoAgricultor({ agricultores, excluirAgricultor }) {
  const navigate = useNavigate();

  const handleInserirClick = () => {
    navigate('/Inserir');
  };

  const handleEditarClick = (id) => {
    navigate(`/EditarAgricultor/${id}`);
  };

  const handleExcluirClick = (id) => {
    excluirAgricultor(id);
  };

  return (
    <div>
      <NavbarComp />
      <div className="container mt-5">
        <h2>Gerenciamento de Agricultor</h2>
        <Button variant="primary" className="mb-3" onClick={handleInserirClick}>
          Inserir novo agricultor
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Agricultor</th>
              <th>Email</th>
              <th>Senha</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {agricultores.map((agricultor) => (
              <tr key={agricultor.id}>
                <td>{agricultor.id}</td>
                <td>{agricultor.nomeAgricultor}</td>
                <td>{agricultor.email}</td>
                <td>{agricultor.senha}</td>
                <td>{agricultor.cpf}</td>
                <td>
                  <Button variant="warning" className="me-2" onClick={() => handleEditarClick(agricultor.id)}>Alterar</Button>
                  <Button variant="danger" onClick={() => handleExcluirClick(agricultor.id)}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default GerenciamentoAgricultor;
