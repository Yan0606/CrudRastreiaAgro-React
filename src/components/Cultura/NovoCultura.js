import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import BarraNavegacao from '../BarraNavegacao';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NovaCultura = () => {
    const [nome, setNome] = useState('');
    const [tempoProducao, setTempoProducao] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Obter o token do localStorage
            const novoCultura = { nome: nome, tempoProducao: tempoProducao}; // Estrutura de dados para a API
            await axios.post('http://localhost:3000/api/cultura/novo', novoCultura, {
                headers: {
                    Authorization: `Bearer ${token}` // Passar o token no cabeçalho
                }
            });

            alert('Cultura cadastrado com sucesso!');
            navigate('/cultura'); 
        } catch (error) {
            console.error('Erro ao cadastrar o cultura:', error.response ? error.response.data : error.message);
            alert('Falha ao cadastrar a cultura. Tente novamente.');
        }
    };

    return (
        <>
            <BarraNavegacao />
            <Container className="mt-5">
                <h2>Novo Cultura</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome da cultura"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formTemp" className="mt-3">
                        <Form.Label>Tempo de Produção</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o Tempo de Produção da cultura"
                            value={tempoProducao}
                            onChange={(e) => setTempoProducao(e.target.value)}
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

export default NovaCultura;

