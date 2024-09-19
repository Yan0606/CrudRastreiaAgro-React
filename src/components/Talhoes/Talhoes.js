import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BarraNavegacao from '../BarraNavegacao';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Talhoes = () => {
    const navigate = useNavigate();
    const [talhoes, setTalhoes] = useState([]);

    const fetchTalhoes = useCallback(async () => {
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
            const response = await axios.get('http://localhost:3000/api/talhoes/', {
                headers: {
                    Authorization: `Bearer ${token}`, // Enviando o token no cabeçalho da requisição
                },
            });

            if (response.status === 200) {
                setTalhoes(response.data); // Ajuste para manipular o estado conforme necessário
            }
        } catch (error) {
            console.error('Erro ao buscar Talhao:', error);

            // Verifica se o erro é 401 e redireciona para o login
            if (error.response && error.response.status === 401) {
                alert('Sessão expirada ou não autorizada. Por favor, faça login novamente.');
                navigate('/login');
            }
        }
    }, [navigate]); // Inclua todas as dependências utilizadas dentro da função

    useEffect(() => {
        fetchTalhoes();
    }, [fetchTalhoes]); // Adiciona fetchSafra como dependência

    const handleNovoTalhoes = () => {
        navigate('/novo-talhoes');
    };

    const handleAlterarTalhoes = (id) => {
        navigate(`/alterar-talhoes/${id}`);
    };

    const handleExcluirTalhoes = async (id) => {
        const confirmar = window.confirm('Você tem certeza que deseja excluir este talhao?');
        if (confirmar) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:3000/api/talhoes/excluir/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTalhoes(talhoes.filter((talhoes) => talhoes.id !== id));
                alert('talhao excluída com sucesso!');
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
                <h2>Gerenciar Talhao</h2>
                <Button variant="primary" className="mb-3" onClick={handleNovoTalhoes}>
                    Novo talhao
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Localizacao</th>
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
                                    <Button variant="danger" onClick={() => handleExcluirTalhoes(talhoes.id)}>
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