import { Routes, Route } from 'react-router-dom';
import Navegacion from './componentes/Navegacion/Navegacion';
import Inicio from './paginas/Inicio/Inicio';
import DetallePersonaje from './paginas/DetallePersonaje/DetallePersonaje';
import './App.css';

function App() {
  return (
    <div className="contenedor-principal">
      <Navegacion />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/especie/:especie" element={<Inicio />} />
        <Route path="/personaje/:id" element={<DetallePersonaje />} />
      </Routes>
    </div>
  )
}

export default App
