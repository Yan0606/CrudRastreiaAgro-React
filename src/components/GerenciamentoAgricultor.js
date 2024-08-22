import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavbarComp from './NavbarComp';

function GerenciamentoAgricultor() {
    const navigate = useNavigate();

    const handleInserirClick = () => {
        navigate('/Inserir');
    };
    const handleEditarClick = () => {
        navigate('/EditarAgricultor');
    };
    const handleExcluirClick = () => {
        navigate('/ExcluirAgricultor');
    };

    return (
        <div>
            <NavbarComp />
            <div className="container mt-5">
                <h2>Gerenciamento de agricultor</h2>
                <Button variant="primary" className="mb-3" onClick={handleInserirClick}>
                    Inserir novo agricultor
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome do agricultor</th>
                            <th>Email</th>
                            <th>Senha</th>
                            <th>CPF</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Dados fictícios */}
                        <tr>
                            <td>1111111111</td>
                            <td>adryan</td>
                            <td>1232323</td>
                            <td>dadadada</td>
                            <td>132322</td>
                            <td>
                                <Button variant="warning" className="me-2" onClick={handleEditarClick} >Alterar</Button>
                                <Button variant="danger" onClick={handleExcluirClick}>Excluir</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>eqeqweqweqweq</td>
                            <td>Yan Andrade</td>
                            <td>yan060604@gmail.com</td>
                            <td>undefined</td>
                            <td>31231321324</td>
                            <td>
                                <Button variant="warning" className="me-2">Alterar</Button>
                                <Button variant="danger">Excluir</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default GerenciamentoAgricultor;
