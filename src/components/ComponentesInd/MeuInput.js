import React from 'react';

const MeuInput = ({ type = 'text', placeholder = '', value, onChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="form-control"
        />
    );
};

export default MeuInput;
