import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BarraNavegacao from '../BarraNavegacao';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Safra = () => {
    const navigate = useNavigate();
    const [safra, setSafra] = useState([]);

    const fetchSafra = async () => {
        try {
            // Obtendo o token do localStorage
            const token = localStorage.getItem('token');

            // Verifica se o token existe antes de prosseguir
            if (!token) {
                alert('Usuário não autenticado. Por favor, faça login.');
                navigate('/login'); // Redireciona para a página de login se o token não existir
                return;
            }

            // Fazendo a requisição com o token de autenticação
            const response = await axios.get('http://localhost:3000/api/safra/', {
                headers: {
                    Authorization: `Bearer ${token}`, // Enviando o token no cabeçalho da requisição
                },
            });

            if (response.status === 200) {
                setSafra(response.data); // Ajuste para manipular o estado conforme necessário
            }
        } catch (error) {
            console.error('Erro ao buscar Safra:', error.response ? error.response.data : error.message);

            // Verifica se o erro é 401 e redireciona para o login
            if (error.response && error.response.status === 401) {
                alert('Sessão expirada ou não autorizada. Por favor, faça login novamente.');
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        fetchSafra();
    }, []);

    const handleNovaSafra = () => {
        navigate('/nova-safra');
    };

    const handleAlterarSafra = (id) => {
        navigate(`/alterar-safra/${id}`);
    };

    const handleExcluirSafra = async (id) => {
        const confirmar = window.confirm('Você tem certeza que deseja excluir esta Safra?');
        if (confirmar) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:3000/api/safra/excluir/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSafra(safra.filter((safra) => safra.id !== id));
                alert('Safra excluída com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir safra:', error.response ? error.response.data : error.message);
                alert('Falha ao excluir a safra. Tente novamente.');
            }
        }
    };

    return (
        <>
            <BarraNavegacao />
            <Container className="mt-5">
                <h2>Gerenciar Safra</h2>
                <Button variant="primary" className="mb-3" onClick={handleNovaSafra}>
                    Novo Safra
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data de início</th>
                            <th>Data Final</th>
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
