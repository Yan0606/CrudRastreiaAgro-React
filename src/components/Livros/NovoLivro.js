import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import BarraNavegacao from '../BarraNavegacao';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NovoLivro = () => {
    const [nome, setNome] = useState('');
    const [autor, setAutor] = useState('');
    const [valor, setValor] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Obter o token do localStorage
            const novoLivro = { nome: nome, autor: autor, valor: valor }; // Estrutura de dados para a API
            await axios.post('http://localhost:8000/api/livros/novo', novoLivro, {
                headers: {
                    Authorization: `Bearer ${token}` // Passar o token no cabeçalho
                }
            });

            alert('Livro cadastrado com sucesso!');
            navigate('/livros'); // Redirecionar para a lista de livros após o cadastro
        } catch (error) {
            console.error('Erro ao cadastrar o livro:', error.response ? error.response.data : error.message);
            alert('Falha ao cadastrar o livro. Tente novamente.');
        }
    };

    return (
        <>
            <BarraNavegacao />
            <Container className="mt-5">
                <h2>Novo Livro</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome do livro"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formAutor" className="mt-3">
                        <Form.Label>Autor</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o autor do livro"
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formValor" className="mt-3">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o valor do livro"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
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

export default NovoLivro;

