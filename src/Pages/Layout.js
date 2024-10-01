import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Features from "../component/Features";
import Categories from "../component/Categories";
import Benefits from "../component/Benefits";
import Footer from "../component/Footer";
import Chatbot from "../component/Chatbot";

function App() {
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
      <Features />
      <Categories />
      <Benefits />
      <Footer />
    </div>
  );
}

export default App;
