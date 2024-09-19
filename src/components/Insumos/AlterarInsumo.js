import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BarraNavegacao from '../BarraNavegacao';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AlterarInsumo = () => {
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [descricao, setDescricao] = useState('');
    const [foto, setFoto] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const carregarInsumo = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/api/insumo/editar/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const insumo = response.data;
                // Garante que os valores não sejam indefinidos
                setNome(insumo[0].nome || '');
                setMarca(insumo[0].marca || '');
                setDescricao(insumo[0].descricao || '');
                setFoto(insumo[0].foto || '');
            } catch (error) {
                console.error('Erro ao carregar o insumo:', error.response ? error.response.data : error.message);
                alert('Falha ao carregar o insumo. Tente novamente.');
            }
        };
        carregarInsumo();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const insumoAtualizado = { nome, marca, descricao, foto };

            await axios.put(`http://localhost:3000/api/insumo/editar/${id}`, insumoAtualizado, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Insumo atualizado com sucesso!');
            navigate('/insumo');
        } catch (error) {
            console.error('Erro ao atualizar o insumo:', error.response ? error.response.data : error.message);
            alert('Falha ao atualizar o insumo. Tente novamente.');
        }
    };

    return (
        <>
            <BarraNavegacao />
            <Container className="mt-5">
                <h2>Alterar Insumo</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome do Insumo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formMarca" className="mt-3">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a marca do insumo"
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formDescricao" className="mt-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a descrição do insumo"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formFoto" className="mt-3">
                        <Form.Label>Foto</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a foto do insumo(temporariamente)"
                            value={foto}
                            onChange={(e) => setFoto(e.target.value)}
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

export default AlterarInsumo;
