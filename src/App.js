import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Dashboard from './components/Dashboard';
import Insumos from './components/Insumos/Insumos';
import NovoInsumo from './components/Insumos/NovoInsumo';
import AlterarInsumo from './components/Insumos/AlterarInsumo';

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
        </Routes>
    </Router>
  );
}

export default App;


