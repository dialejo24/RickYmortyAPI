import { Routes, Route } from 'react-router-dom';
import Navegacion from './componentes/Navegacion/Navegacion';
import Inicio from './paginas/Inicio/Inicio';
import './App.css';

function App() {
  return (
    <div className="contenedor-principal">
      <Navegacion />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/especie/:especie" element={<Inicio />} />
      </Routes>
    </div>
  )
}

export default App
