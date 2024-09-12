import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BarraNavegacao from '../BarraNavegacao';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Talhoes = () => {
    const navigate = useNavigate();
    const [talhoes, setTalhoes] = useState([]);

    const fetchTalhoes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/talhoes/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTalhoes(response.data);
        } catch (error) {
            console.error('Erro ao buscar Talhoe:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchTalhoes();
    }, []);

    const handleNovoTalhoes = () => {
        navigate('/novo-Talhoes');
    };

    const handleAlterarTalhoes = (id) => {
        navigate(`/alterar-Talhoes/${id}`);
    };

    const handleExcluirTalhoes = async (id) => {
        const confirmar = window.confirm("Você tem certeza que deseja excluir este Talhao?");
        if (confirmar) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:3000/api/talhoes/excluir/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTalhoes(talhoes.filter(talhoes => talhoes.id !== id)); //*
                alert('talhao excluído com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir talhao:', error.response ? error.response.data : error.message);
                alert('Falha ao excluir o talhao. Tente novamente.');
            }
        }
    };

    return (
        <>
            <BarraNavegacao />
            <Container className="mt-5">
                <h2>Gerenciar Talhoes</h2>
                <Button variant="primary" className="mb-3" onClick={handleNovoTalhoes}>
                    Novo Talhao
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Localizao</th>
                            <th>Area</th>
                        </tr>
                    </thead>
                    <tbody>
                        {talhoes.map((talhoes) => (
                            <tr key={talhoes.id}>
                                <td>{talhoes.nome}</td>
                                <td>{talhoes.localizacao}</td>
                                <td>{talhoes.area}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        className="me-2"
                                        onClick={() => handleAlterarTalhoes(talhoes.id)}
                                    >
                                        Alterar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleExcluirTalhoes(talhoes.id)}
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

export default Talhoes;