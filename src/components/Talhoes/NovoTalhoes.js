import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import BarraNavegacao from '../BarraNavegacao';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NovoTalhoes = () => {
    const [nome, setNome] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [area, setArea] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Obter o token do localStorage
            const token = localStorage.getItem('token');

            // Verificar se o token está presente
            if (!token) {
                alert('Usuário não autenticado. Por favor, faça login.');
                navigate('/login'); // Redirecionar para a página de login se o token não existir
                return;
            }

            // Estrutura de dados para a API
            const novoTalhoes = { nome, localizacao, area };

            // Fazer a requisição POST com o token no cabeçalho
            await axios.post('http://localhost:3000/api/talhoes/novo', novoTalhoes, {
                headers: {
                    Authorization: `Bearer ${token}`, // Passar o token no cabeçalho
                },
            });

            alert('talhao cadastrado com sucesso!');
            navigate('/talhoes'); // Redirecionar para a lista de safras após o cadastro
        } catch (error) {
            console.error('Erro ao cadastrar o talhoes:', error.response ? error.response.data : error.message);

            // Verifica se o erro é 401 e redireciona para o login
            if (error.response && error.response.status === 401) {
                alert('Sessão expirada ou não autorizada. Por favor, faça login novamente.');
                navigate('/login');
            } else {
                alert('Falha ao cadastrar o talhao. Tente novamente.');
            }
        }
    };

    return (
        <>
            <BarraNavegacao />
            <Container className="mt-5">
                <h2>Novo Talhao</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome do Talhao"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formLocalizacao" className="mt-3">
                        <Form.Label>Localizacao</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a localizacao do talhao"
                            value={localizacao}
                            onChange={(e) => setLocalizacao(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formArea" className="mt-3">
                        <Form.Label>Area</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a area do talhao"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">
                        Salvar
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default NovoTalhoes;