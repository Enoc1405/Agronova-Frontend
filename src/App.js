import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Pages/Layout';
import RegistroUsuarios from './Pages/RegistroUsuarios';
import InicioSesion from './Pages/InicioSesion';
import BaseDeConocimientos from './Pages/BaseDeConocimientos';
import Chatbot from './component/Chatbot.js'; 

function App() {
  return (
    <div>
      {/* El chatbot será visible en todas las páginas */}
      <Chatbot /> 

      <Routes>
        {/* Definir el layout y las rutas */}
        <Route path="/" element={<Layout />} />
        <Route path="BaseDeConocimientos" element={<BaseDeConocimientos />} /> 
        <Route path="RegistroUsuarios" element={<RegistroUsuarios />} /> {/* Página de registro */}
        <Route path="InicioSesion" element={<InicioSesion />} /> 
      </Routes>
    </div>
  );
}

export default App;
