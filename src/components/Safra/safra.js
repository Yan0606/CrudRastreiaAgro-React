import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BarraNavegacao from '../BarraNavegacao';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importando SweetAlert2

const Safra = () => {
    const navigate = useNavigate();
    const [safra, setSafra] = useState([]);

    const fetchSafra = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                Swal.fire({
                    title: 'Usuário não autenticado',
                    text: 'Por favor, faça login.',
                    icon: 'warning',
                    confirmButtonText: 'Ok',
                    background: '#2e2e2e',
                    color: '#fff',
                }).then(() => {
                    navigate('/login');
                });
                return;
            }

            const response = await axios.get('http://localhost:3000/api/safra/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setSafra(response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar Safra:', error);
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    title: 'Sessão expirada',
                    text: 'Por favor, faça login novamente.',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    background: '#2e2e2e',
                    color: '#fff',
                }).then(() => {
                    navigate('/login');
                });
            }
        }
    }, [navigate]);

    useEffect(() => {
        fetchSafra();
    }, [fetchSafra]);

    const handleNovaSafra = () => {
        navigate('/nova-safra');
    };

    const handleAlterarSafra = (id) => {
        navigate(`/alterar-safra/${id}`);
    };

    const handleExcluirSafra = async (id) => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: 'Essa ação não pode ser desfeita!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, excluir!',
            background: '#2e2e2e',
            color: '#fff',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token');
                    await axios.delete(`http://localhost:3000/api/safra/excluir/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setSafra(safra.filter((safra) => safra.id !== id));
                    Swal.fire({
                        title: 'Excluído!',
                        text: 'Safra excluída com sucesso.',
                        icon: 'success',
                        background: '#2e2e2e',
                        color: '#fff',
                        confirmButtonColor: '#3085d6',
                    });
                } catch (error) {
                    console.error('Erro ao excluir safra:', error.response ? error.response.data : error.message);
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Falha ao excluir a safra. Tente novamente.',
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
                <h2>Gerenciar Safra</h2>
                <Button variant="primary" className="mb-3" onClick={handleNovaSafra}>
                    Nova Safra
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data de início</th>
                            <th>Data Final</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {safra.map((safra) => (
                            <tr key={safra.id}>
                                <td>{safra.nome}</td>
                                <td>{safra.dataInicio}</td>
                                <td>{safra.dataFim}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        className="me-2"
                                        onClick={() => handleAlterarSafra(safra.id)}
                                    >
                                        Alterar
                                    </Button>
                                    <Button variant="danger" onClick={() => handleExcluirSafra(safra.id)}>
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

export default Safra;
