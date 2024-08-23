import React from 'react';
import { Form, Button} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import NavbarComp from './NavbarComp';

const EditarAgricultor = () => {
    const location = useLocation();
    const agricultor = location.state?.agricultor || {};

    const [formData, setFormData] = React.useState({
        nomeAgricultor: agricultor.nomeAgricultor || '',
        email: agricultor.email || '',
        senha: agricultor.senha || '',
        cpf: agricultor.cpf || '',
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
        // Lógica para salvar os dados editados
        console.log('Dados Editados:', formData);
    };

    return (
        <div>
            <NavbarComp/>
            <h2>Editar agricultor</h2>
            <Form onSubmit={handleSubmit}>
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
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email"
                    />
                </Form.Group>

                <Form.Group controlId="formSenha" className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="text"
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

                <Button variant="warning" type="submit" href='/GerenciamentoAgricultor'>
                    Alterar
                </Button>
            </Form>
        </div>
    );
};

export default EditarAgricultor;
