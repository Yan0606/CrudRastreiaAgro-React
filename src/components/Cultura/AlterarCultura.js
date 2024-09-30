import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BarraNavegacao from '../BarraNavegacao';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AlterarCultura = () => {
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [tempoProducao, setTempoProducao] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const carregarCultura = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/api/cultura/editar/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const cultura = response.data;
                // Garante que os valores não sejam indefinidos
                setNome(cultura.nome || '');
                setTempoProducao(cultura.tempoProducao || '');

            } catch (error) {
                console.error('Erro ao carregar o cultura:', error.response ? error.response.data : error.message);
                alert('Falha ao carregar a cultura. Tente novamente.');
            }
        };
        carregarCultura();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const culturaAtualizado = { nome, tempoProducao};

            await axios.put(`http://localhost:3000/api/cultura/editar/${id}`, culturaAtualizado, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Cultura atualizado com sucesso!');
            navigate('/cultura');
        } catch (error) {
            console.error('Erro ao atualizar a cultura:', error.response ? error.response.data : error.message);
            alert('Falha ao atualizar o cultura. Tente novamente.');
        }
    };

    return (
        <>
            <BarraNavegacao />
            <Container className="mt-5">
                <h2>Alterar Cultura</h2>
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
                        <Form.Label>Tempo de produção</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Digite o tempo de produção do insumo"
                            value={tempoProducao}
                            onChange={(e) => setTempoProducao(e.target.value)}
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

export default AlterarCultura;
