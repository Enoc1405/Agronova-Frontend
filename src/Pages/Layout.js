// Layout.js
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from "../component/Header";
import Features from "../component/Features";
import Categories from "../component/Categories";
import Benefits from "../component/Benefits";
import Footer from "../component/Footer";
import Chatbot from "../component/Chatbot";
import PlantInfo from "../component/PlantInfo"; // Importar el componente PlantInfo
import { Outlet } from 'react-router-dom';
import Testimonio from '../component/Testimonio';
import Agradecimiento from '../component/Agradecimiento';

function Layout() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/iniciosesion');
  };

  const handleRegisterClick = () => {
    navigate('/registrousuarios');
  };

  return (
    <div className="font-sans">
      <Chatbot />
      <Header onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
      <Routes>
        <Route path="/" element={<Features />} /> {/* Ruta para la vista principal */}
        <Route path="/planta/:apiName" element={<PlantInfo />} /> {/* Ruta para la información de la planta */}
        <Route path="*" element={<Outlet />}> 
        </Route>
      </Routes>
      <Categories /> {/* Aquí se incluye el componente Categories directamente */}
      <Benefits />
      <Testimonio/>
      <Agradecimiento/>
      <Footer />
      
    </div>
  );
}

export default Layout;
