import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarComp from './NavbarComp';

const ExcluirAgricultor = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const agricultor = location.state?.agricultor || {};

    const handleExcluir = () => {
        // Lógica para excluir o agricultor
        console.log('Agricultor excluído:', agricultor);
        navigate('/');  // Redireciona após a exclusão
    };

    return (
        
        <div>
            <NavbarComp/>
            <h2>Excluir agricultor</h2>
            <Form>
                <Form.Group controlId="formNomeAgricultor" className="mb-3">
                    <Form.Label>Nome do agricultor</Form.Label>
                    <Form.Control
                        type="text"
                        value={agricultor.nomeAgricultor}
                        readOnly
                    />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        value={agricultor.email}
                        readOnly
                    />
                </Form.Group>

                <Form.Group controlId="formSenha" className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="text"
                        value={agricultor.senha}
                        readOnly
                    />
                </Form.Group>

                <Form.Group controlId="formCpf" className="mb-3">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                        type="text"
                        value={agricultor.cpf}
                        readOnly
                    />
                </Form.Group>

                <Button variant="danger" onClick={handleExcluir}>
                    Excluir
                </Button>
            </Form>
        </div>
    );
};

export default ExcluirAgricultor;
