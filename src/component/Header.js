import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import loguito from '../assets/images/Loguito.png';
import backgroundImage from '../assets/images/presentation.png';
import { UserIcon } from '@heroicons/react/solid'; // Importar el ícono de usuario

function HeroHeader({ onLoginClick, onRegisterClick }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Hook para navegar a otras rutas

  // Efecto para verificar si el token está en localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Si el token existe, el usuario está autenticado
    }
  }, []);

  // Redirigir a la página de perfil
  const goToProfile = () => {
    navigate("/PefilUsuario"); // Redirigir a la ruta del perfil
  };

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute w-full h-full object-cover top-0 left-0"
      />

      <header className="fixed top-0 left-0 right-0 mx-auto bg-white bg-opacity-100 shadow-md z-10 mt-4 h-16 rounded-3xl w-11/12">
        <div className="flex justify-between items-center p-2 h-full">
          <div className="flex items-center space-x-4">
            <img src={loguito} alt="Logo" className="h-12 md:h-12" />

            {/* Barra de búsqueda */}
            <div className="relative hidden md:block w-96">
              <input
                type="text"
                placeholder="¿Qué quieres cultivar?"
                className="pl-4 pr-10 py-1 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="absolute right-0 top-0 h-full flex items-center pr-4 bg-green-500 rounded-r-full cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-10 w-10 text-white p-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ul className="hidden md:flex space-x-4">
              <li>
                <a href="/" className="text-gray-700 hover:text-green-700 text-sm">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-700 hover:text-green-700 text-sm">
                  Comunidad
                </a>
              </li>
            </ul>

            {!isAuthenticated ? (
              <>
                <button
                  onClick={onLoginClick}
                  className="bg-green-500 text-white py-1 px-4 rounded-full hover:bg-[#1b5a31] transition-transform transform hover:scale-105 mr-10"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={onRegisterClick}
                  className="bg-green-500 text-white py-1 px-4 rounded-full hover:bg-[#1b5a31] transition-transform transform hover:scale-105 mr-10"
                >
                  Registrarse
                </button>
              </>
            ) : (
              // Si el usuario está autenticado, mostramos el botón de perfil
              <button
                onClick={goToProfile} // Llamamos a la función que redirige a la página de perfil
                className="flex items-center justify-center bg-blue-500 rounded-full p-2 hover:bg-blue-600 transition-transform transform hover:scale-105 mr-10"
              >
                <UserIcon className="h-6 w-6 text-white" /> {/* Icono de perfil */}
              </button>

            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default HeroHeader;
