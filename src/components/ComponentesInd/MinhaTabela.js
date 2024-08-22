import React from 'react';
import { Table } from 'react-bootstrap';
import CustomButton from './CustomButton'; // Botão customizado

function MinhaTabela({ colunas, dados, acoes }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {colunas.map((coluna, index) => (
                        <th key={index}>{coluna}</th>
                    ))}
                    {acoes && <th>Ações</th>}
                </tr>
            </thead>
            <tbody>
                {dados && dados.length > 0 ? (
                    dados.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.values(item).map((valor, colIndex) => (
                                <td key={colIndex}>{valor}</td>
                            ))}
                            {acoes && (
                                <td>
                                    {acoes.map((acao, acaoIndex) => (
                                        <CustomButton
                                            key={acaoIndex}
                                            text={acao.text}
                                            color={acao.color}
                                            redirectTo={`${acao.redirectTo}`}
                                            //redirectTo={`${acao.redirectTo}/${item.id}`} aqui é quando for mandar para pagina com id expecifico
                                        />
                                    ))}
                                </td>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={colunas.length + 1} className="text-center">
                            Nenhum dado encontrado
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default MinhaTabela;
