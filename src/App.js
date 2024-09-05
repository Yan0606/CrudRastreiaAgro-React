import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Dashboard from './components/Dashboard';
import Livros from './components/Livros/Livros';
import NovoLivro from './components/Livros/NovoLivro';
import AlterarLivro from './components/Livros/AlterarLivro';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/livros" element={<Livros />} />
          <Route path="/novo-livro" element={<NovoLivro />} />
          <Route path="/alterar-livro/:id" element={<AlterarLivro />} />
        </Routes>
    </Router>
  );
}

export default App;


