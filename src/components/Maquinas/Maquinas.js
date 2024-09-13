import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BarraNavegacao from '../BarraNavegacao';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Maquinas = () => {
    const navigate = useNavigate();
    const [maquinas, setMaquinas] = useState([]);

    const fetchMaquinas = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/maquina/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMaquinas(response.data);
        } catch (error) {
            console.error('Erro ao buscar Máquinas:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchMaquinas();
    }, []);

    const handleNovoMaquina = () => {
        navigate('/nova-maquina');
    };

    const handleAlterarMaquina = (id) => {
        navigate(`/alterar-maquina/${id}`);
    };

    const handleExcluirMaquina = async (id) => {
        const confirmar = window.confirm("Você tem certeza que deseja excluir esta Máquina?");
        if (confirmar) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:3000/api/maquina/excluir/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMaquinas(maquinas.filter(maquina => maquina.id !== id));
                alert('Máquina excluída com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir a máquina:', error.response ? error.response.data : error.message);
                alert('Falha ao excluir a máquina. Tente novamente.');
            }
        }
    };

    return (
        <>
            <BarraNavegacao />
            <Container className="mt-5">
                <h2>Gerenciar Máquinas</h2>
                <Button variant="primary" className="mb-3" onClick={handleNovoMaquina}>
                    Nova Máquina
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Placa</th>
                            <th>Nome</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maquinas.length > 0 ? (
                            maquinas.map((maquina) => (
                                <tr key={maquina.id}>
                                    <td>{maquina.marca}</td>
                                    <td>{maquina.modelo}</td>
                                    <td>{maquina.placa}</td>
                                    <td>{maquina.nome}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            className="me-2"
                                            onClick={() => handleAlterarMaquina(maquina.id)}
                                        >
                                            Alterar
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleExcluirMaquina(maquina.id)}
                                        >
                                            Excluir
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Nenhuma máquina cadastrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default Maquinas;
