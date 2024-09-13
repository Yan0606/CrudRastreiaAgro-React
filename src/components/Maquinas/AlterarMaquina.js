import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BarraNavegacao from '../BarraNavegacao';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AlterarMaquina = () => {
    const { id } = useParams();
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [placa, setPlaca] = useState('');
    const [nome, setNome] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const carregarMaquina = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/api/maquina/editar/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const maquina = response.data;
                setMarca(maquina.marca);
                setModelo(maquina.modelo);
                setPlaca(maquina.placa);
                setNome(maquina.nome);
            } catch (error) {
                console.error('Erro ao carregar máquina:', error.response ? error.response.data : error.message);
                alert('Falha ao carregar a máquina. Tente novamente.');
            }
        };
        carregarMaquina();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const maquinaAtualizada = { marca, modelo, placa, nome };
            await axios.put(`http://localhost:3000/api/maquina/editar/${id}`, maquinaAtualizada, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Máquina atualizada com sucesso!');
            navigate('/maquinas');
        } catch (error) {
            console.error('Erro ao atualizar a Máquina:', error.response ? error.response.data : error.message);
            alert('Falha ao atualizar a máquina. Tente novamente.');
        }
    };

    return (
        <>
            <BarraNavegacao />
            <Container className="mt-5">
                <h2>Alterar Máquina</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formMarca">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a marca da máquina"
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formModelo" className="mt-3">
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o modelo da máquina"
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPlaca" className="mt-3">
                        <Form.Label>Placa</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a placa da máquina"
                            value={placa}
                            onChange={(e) => setPlaca(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formNome" className="mt-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome da máquina"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
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

export default AlterarMaquina;
