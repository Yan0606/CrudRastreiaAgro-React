import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomButton = ({ text, color, redirectTo }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(redirectTo);
    };

    return (
        <button 
            className={`btn btn-${color}`} 
            onClick={handleClick}
        >
            {text}
        </button>
    );
};

export default CustomButton;
