import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BarraNavegacao from '../BarraNavegacao';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Insumos = () => {
    const navigate = useNavigate();
    const [insumos, setInsumos] = useState([]);

    const fetchInsumos = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/insumo/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setInsumos(response.data);
        } catch (error) {
            console.error('Erro ao buscar Insumos:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchInsumos();
    }, []);

    const handleNovoInsumo = () => {
        navigate('/novo-insumo');
    };

    const handleAlterarInsumo = (id) => {
        navigate(`/alterar-insumo/${id}`);
    };

    const handleExcluirInsumo = async (id) => {
        const confirmar = window.confirm("Você tem certeza que deseja excluir este Insumo?");
        if (confirmar) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:3000/api/insumo/excluir/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setInsumos(insumos.filter(insumo => insumo.id !== id)); //*
                alert('Insumo excluído com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir insumo:', error.response ? error.response.data : error.message);
                alert('Falha ao excluir o insumo. Tente novamente.');
            }
        }
    };

    return (
        <>
            <BarraNavegacao />
            <Container className="mt-5">
                <h2>Gerenciar Insumos</h2>
                <Button variant="primary" className="mb-3" onClick={handleNovoInsumo}>
                    Novo Insumo
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Marca</th>
                            <th>Descrição</th>
                            <th>foto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {insumos.map((insumo) => (
                            <tr key={insumo.id}>
                                <td>{insumo.nome}</td>
                                <td>{insumo.marca}</td>
                                <td>{insumo.descricao}</td>
                                <td>{insumo.foto}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        className="me-2"
                                        onClick={() => handleAlterarInsumo(insumo.id)}
                                    >
                                        Alterar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleExcluirInsumo(insumo.id)}
                                    >
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default Insumos;

