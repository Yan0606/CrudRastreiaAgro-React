import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BarraNavegacao from '../BarraNavegacao';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Livros = () => {
    const navigate = useNavigate();
    const [livros, setLivros] = useState([]);

    const fetchLivros = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/livros/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLivros(response.data);
        } catch (error) {
            console.error('Erro ao buscar livros:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchLivros();
    }, []);

    const handleNovoLivro = () => {
        navigate('/novo-livro');
    };

    const handleAlterarLivro = (id) => {
        navigate(`/alterar-livro/${id}`);
    };

    const handleExcluirLivro = async (id) => {
        const confirmar = window.confirm("Você tem certeza que deseja excluir este livro?");
        if (confirmar) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8000/api/livros/excluir/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setLivros(livros.filter(livro => livro.id !== id)); //*
                alert('Livro excluído com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir livro:', error.response ? error.response.data : error.message);
                alert('Falha ao excluir o livro. Tente novamente.');
            }
        }
    };

    return (
        <>
            <BarraNavegacao />
            <Container className="mt-5">
                <h2>Gerenciar Livros</h2>
                <Button variant="primary" className="mb-3" onClick={handleNovoLivro}>
                    Novo Livro
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Autor</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro) => (
                            <tr key={livro.id}>
                                <td>{livro.nome}</td>
                                <td>{livro.autor}</td>
                                <td>{livro.valor}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        className="me-2"
                                        onClick={() => handleAlterarLivro(livro.id)}
                                    >
                                        Alterar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleExcluirLivro(livro.id)}
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

export default Livros;

