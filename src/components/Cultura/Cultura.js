import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BarraNavegacao from '../BarraNavegacao';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Cultura = () => {
    const navigate = useNavigate();
    const [cultura, setCultura] = useState([]);

    const fetchCultura = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/cultura/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCultura(response.data);
        } catch (error) {
            console.error('Erro ao buscar Culturas:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchCultura();
    }, []);

    const handleNovoCultura = () => {
        navigate('/novo-cultura');
    };

    const handleAlterarCultura = (id) => {
        navigate(`/alterar-cultura/${id}`);
    };

    const handleExcluirCultura = async (id) => {
        const confirmar = window.confirm("Você tem certeza que deseja excluir essa cultura?");
        if (confirmar) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:3000/api/cultura/excluir/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCultura(cultura.filter(cultura => cultura.id !== id)); //*
                alert('Cultura excluído com sucesso!');
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
                <h2>Gerenciar Culturas</h2>
                <Button variant="primary" className="mb-3" onClick={handleNovoCultura}>
                    Nova Cultura
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Tempo de Produção</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cultura.map((cultura) => (
                            <tr key={cultura.id}>
                                <td>{cultura.nome}</td>
                                <td>{cultura.tempoProducao}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        className="me-2"
                                        onClick={() => handleAlterarCultura(cultura.id)}
                                    >
                                        Alterar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleExcluirCultura(cultura.id)}
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

export default Cultura;

