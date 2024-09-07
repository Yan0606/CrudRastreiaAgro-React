import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import BarraNavegacao from '../BarraNavegacao';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NovaSafra = () => {
    const [nome, setNome] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Obter o token do localStorage
            const novaSafra = { nome: nome, dataInicio: dataInicio, dataFim: dataFim }; // Estrutura de dados para a API
            await axios.post('http://localhost:3000/api/safra/novo', novaSafra, {
                headers: {
                    Authorization: `Bearer ${token}` // Passar o token no cabeçalho
                }.get
            });

            alert('Safra cadastrada com sucesso!');
            navigate('/safra'); // Redirecionar para a lista de livros após o cadastro
        } catch (error) {
            console.error('Erro ao cadastrar a safra:', error.response ? error.response.data : error.message);
            alert('Falha ao cadastrar a safra. Tente novamente.');
        }
    };

    return (
        <>
            <BarraNavegacao />
            <Container className="mt-5">
                <h2>Nova Safra</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome da Safra"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formDataInicio" className="mt-3">
                        <Form.Label>Data de início</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Digite a data de incio da Safra"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formDataFim" className="mt-3">
                        <Form.Label>Data Fim</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Digite a data final da Safra"
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
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

export default NovaSafra;

