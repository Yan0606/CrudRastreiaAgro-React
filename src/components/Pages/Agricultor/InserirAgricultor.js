import React from 'react';
import Home from '../../Home';
import MeuForm from '../../ComponentesInd/MeuForm';
function InserirAgricultor() {
    const campos = [
        { name: 'id', label: 'ID', type: 'text', placeholder: 'ID' },
        { name: 'nome', label: 'Nome do agricultor', type: 'text', placeholder: 'Nome do agricultor' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'email' },
        { name: 'senha', label: 'Senha', type: 'password', placeholder: 'senha' },
        { name: 'cpf', label: 'CPF', type: 'text', placeholder: 'cpf' },
    ];

    const botao = {
        text: 'Inserir',
        color: 'primary',
    };


    return (
        <div>
            <Home />
            <div className="container mt-3"> 
            <h1>Inserir Agricultor</h1>
            <MeuForm campos={campos} botao={botao} />


            </div>
        </div>
    );
}

export default InserirAgricultor;
