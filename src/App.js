import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Pages/Layout';
import RegistroUsuarios from './Pages/RegistroUsuarios';
import InicioSesion from './Pages/InicioSesion';
import PlantInfo from "./component/PlantInfo"; 
import PerfilUsuario  from "./component/PerfilUsuario"; 


function App() {
  return (
    <div>
      <Routes>
        {/* Definir el layout y las rutas */}
        <Route path="/*" element={<Layout />} />
        <Route path="/planta/:apiName" element={<PlantInfo />} /> 
        <Route path="RegistroUsuarios" element={<RegistroUsuarios />} />
        <Route path="InicioSesion" element={<InicioSesion />} />
        <Route path="/PefilUsuario" element={<PerfilUsuario  />} />
      </Routes>
    </div>
  );
}

export default App;
