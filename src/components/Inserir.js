import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './NavbarComp';


const Inserir = () => {
    const [formData, setFormData] = useState({
        id: '',
        nomeAgricultor: '',
        email: '',
        senha: '',
        cpf: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar os dados do formulário
        console.log('Dados do Formulário:', formData);
    };

    return (
        
        <div >
            <NavbarComp/>
            <h2>Inserir Novo agricultor</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formId" className="mb-3">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        placeholder="ID"
                    />
                </Form.Group>

                <Form.Group controlId="formNomeAgricultor" className="mb-3">
                    <Form.Label>Nome do agricultor</Form.Label>
                    <Form.Control
                        type="text"
                        name="nomeAgricultor"
                        value={formData.nomeAgricultor}
                        onChange={handleChange}
                        placeholder="Nome do agricultor"
                    />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email"
                    />
                </Form.Group>

                <Form.Group controlId="formSenha" className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        placeholder="senha"
                    />
                </Form.Group>

                <Form.Group controlId="formCpf" className="mb-3">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        placeholder="cpf"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Inserir
                </Button>
            </Form>
        </div>
    );
};

export default Inserir;
