import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BarraNavegacao from '../BarraNavegacao';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AlterarSafra = () => {
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const carregarSafra = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/api/safra/editar/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const safra = response.data;
                setNome(safra.nome);
                setDataInicio(safra.dataInicio.substring(0,10));
                setDataFim(safra.dataFim.substring(0,10));

            } catch (error) {
                console.error('Erro ao carregar a safra:', error.response ? error.response.data : error.message);
                alert('Falha ao carregar a safra. Tente novamente.');
            }
        };
        carregarSafra();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const safraAtualizado = { nome: nome, dataInicio: dataInicio, dataFim: dataFim };
            await axios.put(`http://localhost:3000/api/safra/editar/${id}`, safraAtualizado, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Safra atualizada com sucesso!');
            navigate('/safra');
        } catch (error) {
            console.error('Erro ao atualizar a safra:', error.response ? error.response.data : error.message);
            alert('Falha ao atualizar a safra. Tente novamente.');
        }
    };

    return (
        <>
            <BarraNavegacao />
            <Container className="mt-5">
                <h2>Alterar Safra</h2>
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
                        <Form.Label>Data de inicío</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Digite a data de incio da safra"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formDataFim" className="mt-3">
                        <Form.Label>Data Final</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Digite a data final da safra"
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
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

export default AlterarSafra;

