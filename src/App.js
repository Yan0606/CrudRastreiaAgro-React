import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Dashboard from './components/Dashboard';

import Insumos from './components/Insumos/Insumos';
import NovoInsumo from './components/Insumos/NovoInsumo';
import AlterarInsumo from './components/Insumos/AlterarInsumo';

import Safra from './components/Safra/safra';
import NovaSafra from './components/Safra/novaSafra';
import AlterarSafra from './components/Safra/alterarSafra';

import Talhoes from './components/Talhoes/Talhoes';
import AlterarTalhoes from './components/Talhoes/AlterarTalhoes';
import NovoTalhoes from './components/Talhoes/NovoTalhoes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/insumos" element={<Insumos />} />
        <Route path="/novo-insumo" element={<NovoInsumo />} />
        <Route path="/alterar-insumo/:id" element={<AlterarInsumo />} />

        <Route path="/safra" element={<Safra />} />
        <Route path="/nova-safra" element={<NovaSafra />} />
        <Route path="/alterar-safra/:id" element={<AlterarSafra />} />

        <Route path="/talhoes" element={<Talhoes />} />
        <Route path="/novo-talhoes" element={<NovoTalhoes />} />
        <Route path="/alterar-talhoes/:id" element={<AlterarTalhoes />} />


      </Routes>
    </Router>
  );  
}

export default App;


