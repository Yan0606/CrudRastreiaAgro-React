import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarComp from './NavbarComp';

const ExcluirAgricultor = ({ agricultores, excluirAgricultor }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const agricultor = agricultores.find(ag => ag.id === id);

  const handleExcluir = () => {
    excluirAgricultor(id);
    navigate('/GerenciamentoAgricultor');
  };

  return (
    <div>
      <NavbarComp />
      <div className="container mt-5">
        <h2>Excluir Agricultor</h2>
        <p>Tem certeza que deseja excluir o agricultor <strong>{agricultor?.nomeAgricultor}</strong>?</p>
        <button className="btn btn-danger me-2" onClick={handleExcluir}>Sim</button>
        <button className="btn btn-secondary" onClick={() => navigate('/GerenciamentoAgricultor')}>Não</button>
      </div>
    </div>
  );
};

export default ExcluirAgricultor;
