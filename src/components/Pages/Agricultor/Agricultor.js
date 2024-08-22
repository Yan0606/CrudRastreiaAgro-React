import React from 'react';
import Home from '../../Home';
import CustomButton from '../../ComponentesInd/CustomButton';
import MinhaTabela from '../../ComponentesInd/MinhaTabela';

function Agricultor() {

    // Configuração para agricultores
    const colunasAgricultores = ['ID', 'Nome do agricultor', 'Email', 'Senha', 'CPF'];
    const dadosAgricultores = [
        { id: '1111111111', nome: 'Adryan', email: 'adryan@example.com', senha: 'dadadada', cpf: '132322' },
        { id: 'eqeqweqweqweq', nome: 'Yan Andrade', email: 'yan060604@gmail.com', senha: 'undefined', cpf: '31231321324' }
    ];
    const acoesAgricultores = [
        { text: 'Alterar', color: 'warning', redirectTo: "/AlterarAgricultor" },
        { text: 'Excluir', color: 'danger', redirectTo: "/ExcluirAgricultor" }
    ];


    return (
        <div>
            <Home />



            <div className="container mt-3">
                <h1>Gerenciar Agricultor</h1>

                <CustomButton
                    text="Inserir novo agricultor"
                    color="primary"
                    redirectTo="/InserirAgricultor"
                />

                <MinhaTabela 
                colunas={colunasAgricultores} 
                dados={dadosAgricultores} 
                acoes={acoesAgricultores} 
                />

            </div>
        </div>
    );
}

export default Agricultor;
