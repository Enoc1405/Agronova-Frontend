import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Pages/Layout';
import RegistroUsuarios from './Pages/RegistroUsuarios';
import InicioSesion from './Pages/InicioSesion';


function App() {
  return (
    <div>
      <Routes>
        {/* Definir el layout y las rutas */}
        <Route path="/" element={<Layout />} />
      
        <Route path="RegistroUsuarios" element={<RegistroUsuarios />} />
        <Route path="InicioSesion" element={<InicioSesion />} />
      </Routes>
    </div>
  );
}

export default App;
