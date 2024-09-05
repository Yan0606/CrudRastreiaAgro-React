import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BarraNavegacao from '../BarraNavegacao';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AlterarLivro = () => {
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [autor, setAutor] = useState('');
    const [valor, setValor] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const carregarLivro = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/api/livros/editar/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const livro = response.data;
                setNome(livro.nome);
                setAutor(livro.autor);
                setValor(livro.valor);
            } catch (error) {
                console.error('Erro ao carregar o livro:', error.response ? error.response.data : error.message);
                alert('Falha ao carregar o livro. Tente novamente.');
            }
        };
        carregarLivro();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const livroAtualizado = { nome: nome, autor: autor, valor: valor };
            await axios.put(`http://localhost:8000/api/livros/editar/${id}`, livroAtualizado, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Livro atualizado com sucesso!');
            navigate('/livros');
        } catch (error) {
            console.error('Erro ao atualizar o livro:', error.response ? error.response.data : error.message);
            alert('Falha ao atualizar o livro. Tente novamente.');
        }
    };

    return (
        <>
            <BarraNavegacao />
            <Container className="mt-5">
                <h2>Alterar Livro</h2>
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
                        Salvar Alterações
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default AlterarLivro;

