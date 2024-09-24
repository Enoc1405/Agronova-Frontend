import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Pages/Layout';
import Inicio from './Pages/Inicio';
import RegistroUsuarios from './Pages/RegistroUsuarios';
import InicioSesion from './Pages/InicioSesion';

function App() {
  return (
    <div>
      <Routes>
        {/* Definir el layout y las rutas */}
        <Route path="/" element={<Layout />}>
          {/* Rutas dentro del layout */}
          <Route index element={<Inicio />} /> {/* Página de inicio */}
         
        </Route>
        <Route path="RegistroUsuarios" element={<RegistroUsuarios />} /> {/* Página de registro */}
        <Route path="InicioSesion" element={<InicioSesion />} /> 
      </Routes>
    </div>
  );
}

export default App;
