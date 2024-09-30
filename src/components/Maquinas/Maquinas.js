import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BarraNavegacao from '../BarraNavegacao';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importando SweetAlert2

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
        Swal.fire({
            title: 'Você tem certeza?',
            text: 'Essa ação não pode ser desfeita!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar',
            background: '#2e2e2e',
            color: '#fff',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token');
                    await axios.delete(`http://localhost:3000/api/maquina/excluir/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setMaquinas(maquinas.filter((maquina) => maquina.id !== id));
                    Swal.fire({
                        title: 'Excluído!',
                        text: 'Máquina excluída com sucesso.',
                        icon: 'success',
                        background: '#2e2e2e',
                        color: '#fff',
                        confirmButtonColor: '#3085d6',
                    });
                } catch (error) {
                    console.error('Erro ao excluir a máquina:', error.response ? error.response.data : error.message);
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Falha ao excluir a máquina. Tente novamente.',
                        icon: 'error',
                        background: '#2e2e2e',
                        color: '#fff',
                        confirmButtonColor: '#d33',
                    });
                }
            }
        });
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
