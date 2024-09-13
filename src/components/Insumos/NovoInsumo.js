import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import BarraNavegacao from '../BarraNavegacao';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NovoInsumo = () => {
    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [descricao, setDescricao] = useState('');
    const [foto, setFoto] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Obter o token do localStorage
            const novoInsumo = { nome: nome, marca: marca, descricao: descricao, foto: foto}; // Estrutura de dados para a API
            await axios.post('http://localhost:3000/api/insumo/novo', novoInsumo, {
                headers: {
                    Authorization: `Bearer ${token}` // Passar o token no cabeçalho
                }
            });

            alert('Insumo cadastrado com sucesso!');
            navigate('/insumos'); 
        } catch (error) {
            console.error('Erro ao cadastrar o insumo:', error.response ? error.response.data : error.message);
            alert('Falha ao cadastrar o insumo. Tente novamente.');
        }
    };

    return (
        <>
            <BarraNavegacao />
            <Container className="mt-5">
                <h2>Novo Insumo</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome do insumo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formAutor" className="mt-3">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a marca do insumo"
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formValor" className="mt-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a descrição do insumo"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formValor" className="mt-3">
                        <Form.Label>Foto</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite uma foto"
                            value={foto}
                            onChange={(e) => setFoto(e.target.value)}
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

export default NovoInsumo;

