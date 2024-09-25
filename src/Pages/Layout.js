import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import heroImage from '../assets/images/presentation.png';
import loguito from '../assets/images/Loguito.png';
import maiz from '../assets/images/Plantas/maiz.png';
import trigo from '../assets/images/Plantas/trigo.png';
import arroz from '../assets/images/Plantas/arroz.png';
import avena from '../assets/images/Plantas/avena.png';
import menta from '../assets/images/Plantas/menta.png';
import manzanilla from '../assets/images/Plantas/manzanilla.png';
import oregano from '../assets/images/Plantas/oregano.png';
import mango from '../assets/images/Plantas/mango.png';
import pina from '../assets/images/Plantas/piña.png';
import banana from '../assets/images/Plantas/banano.png';
import naranja from '../assets/images/Plantas/naranja.png';
import yuca from '../assets/images/Plantas/yuca.png';
import papa from '../assets/images/Plantas/papa.png';
import jengibre from '../assets/images/Plantas/jengibre.png';

function App() {
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleLoginClick = () => {
    navigate('/iniciosesion'); // Redirige a la página de inicio de sesión
  };

  const handleRegisterClick = () => {
    navigate('/registrousuarios'); // Redirige a la página de registro
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-white p-0 shadow-md flex justify-between items-center px-8">
        <img src={loguito} alt="Agrónova Logo" className="h-16" />
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li><a href="/" className="text-gray-600 hover:text-purple-700">Contacto</a></li>
            <li><a href="/" className="text-gray-600 hover:text-purple-700">Comunidad</a></li>
          </ul>
          <button 
            onClick={handleLoginClick} 
            className="bg-[#20683D] text-white py-1 px-4 rounded hover:bg-[#1b5a31] transition-transform transform hover:scale-105"
          >
            Iniciar sesión
          </button>
          <button 
            onClick={handleRegisterClick} 
            className="bg-[#20683D] text-white py-1 px-4 rounded hover:bg-[#1b5a31] transition-transform transform hover:scale-105"
          >
            Registrarse
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-96 flex flex-col justify-center items-center text-white animate-fade-in"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Puedes añadir contenido aquí */}
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow-md text-center animate-slide-in-left">
            <h3 className="font-bold text-lg">Controla los Sensores</h3>
            <p className="mt-2 text-gray-600">Información en tiempo real desde tus cultivos.</p>
          </div>
          <div className="bg-white p-6 shadow-md text-center animate-slide-in-left delay-200">
            <h3 className="font-bold text-lg">Actualizaciones Automáticas</h3>
            <p className="mt-2 text-gray-600">No te pierdas ninguna actualización importante.</p>
          </div>
          <div className="bg-white p-6 shadow-md text-center animate-slide-in-left delay-400">
            <h3 className="font-bold text-lg">Riego Eficiente</h3>
            <p className="mt-2 text-gray-600">Optimiza el uso del agua en tus cultivos.</p>
          </div>
        </div>
      </section>

      {/* Categories with hover animation */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto">
          {/* Granos y cereales */}
          <h2 className="text-2xl font-bold mb-4">Granos y Cereales</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CategoryItem name="Maíz" image={maiz} />
            <CategoryItem name="Trigo" image={trigo} />
            <CategoryItem name="Arroz" image={arroz} />
            <CategoryItem name="Avena" image={avena} />
          </div>

          {/* Plantas medicinales */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Plantas Medicinales</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CategoryItem name="Menta" image={menta} />
            <CategoryItem name="Manzanilla" image={manzanilla} />
            <CategoryItem name="Orégano" image={oregano} />
          </div>

          {/* Frutas */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Frutas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CategoryItem name="Mango" image={mango} />
            <CategoryItem name="Piña" image={pina} />
            <CategoryItem name="Banana" image={banana} />
            <CategoryItem name="Naranja" image={naranja} />
          </div>

          {/* Raíces y tubérculos */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Raíces y Tubérculos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CategoryItem name="Yuca" image={yuca} />
            <CategoryItem name="Papa" image={papa} />
            <CategoryItem name="Jengibre" image={jengibre} />
          </div>
        </div>
      </section>

      {/* Benefits with slide-in animation */}
      <section className="bg-purple-100 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Beneficios para Agricultores</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <BenefitItem title="Respuesta Rápida" />
            <BenefitItem title="Ahorro de Tiempo" />
            <BenefitItem title="Aumento de Productividad" />
            <BenefitItem title="Mejora en la Toma de Decisiones" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-10">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start">
    {/* Logo y mensaje */}
    <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
      <img src={loguito} alt="Agrónova Logo" className="h-16 mb-2" />
      <p className="text-gray-800 font-semibold">Gracias por su apoyo!</p>
      <p className="text-gray-600 text-sm">Un asistente en sus manos</p>
    </div>

    {/* Links de Compañía, Ayuda y Recursos */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Sección Compañía */}
      <div>
        <h4 className="text-gray-900 font-bold mb-2">Compañía</h4>
        <ul className="text-gray-600 space-y-1">
          <li><a href="#" className="hover:text-gray-800">Acerca de nosotros</a></li>
          <li><a href="#" className="hover:text-gray-800">Nuestro compromiso</a></li>
          <li><a href="#" className="hover:text-gray-800">Contacto</a></li>
        </ul>
      </div>

      {/* Sección Ayuda */}
      <div>
        <h4 className="text-gray-900 font-bold mb-2">Ayuda</h4>
        <ul className="text-gray-600 space-y-1">
          <li><a href="#" className="hover:text-gray-800">Preguntas frecuentes</a></li>
          <li><a href="#" className="hover:text-gray-800">Soporte técnico</a></li>
          <li><a href="#" className="hover:text-gray-800">Centro de asistencia</a></li>
        </ul>
      </div>

      {/* Sección Recursos */}
      <div>
        <h4 className="text-gray-900 font-bold mb-2">Recursos</h4>
        <ul className="text-gray-600 space-y-1">
          <li><a href="#" className="hover:text-gray-800">Blog</a></li>
          <li><a href="#" className="hover:text-gray-800">Actualizaciones agrícolas</a></li>
        </ul>
      </div>
    </div>

    {/* Redes sociales */}
    <div className="flex space-x-4 mt-6 md:mt-0">
      <a href="#" className="text-green-600 hover:text-green-800">
        <i className="fab fa-whatsapp fa-lg"></i>
      </a>
      <a href="#" className="text-green-600 hover:text-green-800">
        <i className="fab fa-instagram fa-lg"></i>
      </a>
      <a href="#" className="text-green-600 hover:text-green-800">
        <i className="fab fa-facebook fa-lg"></i>
      </a>
    </div>
  </div>
</footer>

    </div>
  );
}

function CategoryItem({ name, image }) {
  return (
    <div className="bg-white p-4 shadow-md text-center transition-transform transform hover:scale-105">
      <img
        src={image}
        alt={name}
        className="h-38 w-full object-cover" 
      />
      <h3 className="mt-2 font-bold">{name}</h3>
    </div>
  );
}

function BenefitItem({ title }) {
  return (
    <div className="bg-white p-6 shadow-md animate-slide-in-left">
      <h3 className="font-bold">{title}</h3>
    </div>
  );
}

export default App;
