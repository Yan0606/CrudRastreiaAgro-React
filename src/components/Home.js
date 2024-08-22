import React from 'react';
import NavbarComp from './NavbarComp';

function Home() {
    return (
        <div>
            <NavbarComp/>
            <div className="container mt-3">
                <h1>Bem-vindo ao RastreiaAgro</h1>
                {/* Conteúdo da página vai aqui */}
            </div>
        </div>
    );
}

export default Home;
