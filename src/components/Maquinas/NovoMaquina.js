import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import BarraNavegacao from '../BarraNavegacao';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NovoMaquina = () => {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [placa, setPlaca] = useState('');
    const [nome, setNome] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Usuário não eutenticado. Por favor, faça o Login!',
                    icon: 'error',
                    background: '#2e2e2e',
                    color: '#fff',
                    confirmButtonColor: '#d33',
                });
                navigate('/login');
                return;
            }
            const novaMaquina = { marca, modelo, placa, nome };
            await axios.post('http://localhost:3000/api/maquina/novo', novaMaquina, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            Swal.fire({
                title: 'Sucesso!',
                text: 'Maquina cadastrada com sucesso!',
                icon: 'success',
                background: '#2e2e2e',
                color: '#fff',
                confirmButtonColor: '#3085d6',
                iconColor: '#4caf50',
            }).then(() => {
                navigate('/maquinas');
            });
        } catch (error) {
            console.error('Erro ao cadastrar a máquina:', error.response ? error.response.data : error.message);
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
                    text: 'Falha ao cadastrar a máquina. Tente novamente.',
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
                <h2>Nova Máquina</h2>
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
                        Salvar
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default NovoMaquina;
