import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Pages/Layout';
import RegistroUsuarios from './Pages/RegistroUsuarios';
import InicioSesion from './Pages/InicioSesion';
import Dashboard from './component/Dashboard';
import Chat from './component/chat';
import FormularioGuia  from "./component/FormularioGuia";
import About from './component/About';
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
        <Route path="/About" element={<About />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/FormularioGuia" element={<FormularioGuia  />} />
      </Routes>
    </div>
  );
}

export default App;
