import React, { useState } from 'react';
import MeuInput from './MeuInput';
import CustomButton from './CustomButton';

const MeuForm = ({ campos, botao }) => {
    const [valores, setValores] = useState(
        campos.reduce((acc, campo) => ({ ...acc, [campo.name]: '' }), {})
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValores({ ...valores, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulário enviado:', valores);
        // Aqui você pode adicionar a lógica de envio do formulário
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-5">
            {campos.map((campo, index) => (
                <div key={index} className="mb-3">
                    <label>{campo.label}</label>
                    <MeuInput
                        type={campo.type}
                        placeholder={campo.placeholder}
                        value={valores[campo.name]}
                        onChange={handleChange}
                        name={campo.name} // Adiciona o nome para identificar o campo
                    />
                </div>
            ))}
            <CustomButton
                text={botao.text}
                color={botao.color}
                //type="submit" // Define o tipo como submit para submeter o formulário
            />
        </form>
    );
};

export default MeuForm;
