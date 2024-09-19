import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BarraNavegacao from '../BarraNavegacao';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AlterarTalhoes = () => {
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [area, setArea] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const carregarTalhoes = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/api/talhoes/editar/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const talhoes = response.data;
                setNome(talhoes.nome);
                setLocalizacao(talhoes.localizacao.substring(0,10));
                setArea(talhoes.area.substring(0,10));

            } catch (error) {
                console.error('Erro ao carregar o talhao:', error.response ? error.response.data : error.message);
                alert('Falha ao carregar o talhao. Tente novamente.');
            }
        };
        carregarTalhoes();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const talhoesAtualizado = { nome: nome, localizacao: localizacao, area: area };
            await axios.put(`http://localhost:3000/api/talhoes/editar/${id}`, talhoesAtualizado, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('talhao atualizada com sucesso!');
            navigate('/talhoes');
        } catch (error) {
            console.error('Erro ao atualizar o talhao:', error.response ? error.response.data : error.message);
            alert('Falha ao atualizar o talhao. Tente novamente.');
        }
    };

    return (
        <>
            <BarraNavegacao />
            <Container className="mt-5">
                <h2>Alterar Talhoes</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome do talhao"
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
                            placeholder="Digite a area da safra"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
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

export default AlterarTalhoes;