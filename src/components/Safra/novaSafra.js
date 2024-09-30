import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import BarraNavegacao from '../BarraNavegacao';
import Swal from 'sweetalert2';
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
            // Obter o token do localStorage
            const token = localStorage.getItem('token');

            // Verificar se o token está presente
            if (!token) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Usuário não autenticado. Por favor, faça login.',
                    icon: 'error',
                    background: '#2e2e2e',
                    color: '#fff',
                    confirmButtonColor: '#d33',
                });
                navigate('/login');
                return;
            }

            // Estrutura de dados para a API
            const novaSafra = { nome, dataInicio, dataFim };

            await axios.post('http://localhost:3000/api/safra/novo', novaSafra, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });

            Swal.fire({
                title: 'Sucesso!',
                text: 'Safra cadastrada com sucesso!',
                icon: 'success',
                background: '#2e2e2e', 
                color: '#fff', 
                confirmButtonColor: '#3085d6',
                iconColor: '#4caf50', 
            }).then(() => {
                navigate('/safra');
            });
        } catch (error) {
            console.error('Erro ao cadastrar a safra:', error.response ? error.response.data : error.message);

            if (error.response && error.response.status === 401) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Sessão expirada ou não autorizada. Por favor, faça login novamente.',
                    icon: 'error',
                    background: '#2e2e2e',
                    color: '#fff',
                    confirmButtonColor: '#d33',
                }).then(() => {
                    navigate('/login');
                });
            } else {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Falha ao cadastrar a safra. Tente novamente.',
                    icon: 'error',
                    background: '#2e2e2e',
                    color: '#fff',
                    confirmButtonColor: '#d33',
                });
            }
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
                            placeholder="Digite a data de início da Safra"
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
