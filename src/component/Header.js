import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loguito from '../assets/images/Loguito.png';
import backgroundImage from '../assets/images/presentation.png';
import { MenuIcon, XIcon, UserIcon } from '@heroicons/react/solid'; // Importar íconos necesarios

function HeroHeader({ onLoginClick, onRegisterClick }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú hamburguesa
  const navigate = useNavigate();

  // Efecto para verificar si el token está en localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Redirigir a la página de perfil
  const goToProfile = () => {
    console.log('Navegando a perfil'); // Agrega este log para asegurarte que la función se llama
    navigate("/PefilUsuario"); // Cambia la ruta si el path es diferente
  };

  // Cerrar sesión (ejemplo)
  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token
    setIsAuthenticated(false); // Actualizar el estado de autenticación
    setIsMenuOpen(false); // Cerrar el menú al hacer logout
    navigate("/"); // Redirigir a la página de inicio o donde prefieras
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
            {!isAuthenticated ? (
              <>
                <button
                  onClick={onLoginClick}
                  className="bg-green-500 text-white py-1 px-4 rounded-full hover:bg-[#1b5a31] transition-transform transform hover:scale-105 "
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={onRegisterClick}
                  className="bg-green-500 text-white py-1 px-4 rounded-full hover:bg-[#1b5a31] transition-transform transform hover:scale-105 mr-4"
                >
                  Registrarse
                </button>
              </>
            ) : (
              // Si el usuario está autenticado, mostramos el menú de hamburguesa
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)} // Alternar el menú
                  className="flex items-center justify-center bg-green-500 rounded-full p-2 hover:bg-green-600 transition-transform transform hover:scale-105 mr-10"
                >
                  {isMenuOpen ? (
                    <XIcon className="h-6 w-6 text-white" /> // Ícono X cuando el menú está abierto
                  ) : (
                    <MenuIcon className="h-6 w-6 text-white" /> // Ícono de hamburguesa cuando está cerrado
                  )}
                </button>

                {/* Menú desplegable */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <button
                      onClick={goToProfile}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Perfil
                    </button>

                    <button
                      onClick={goToProfile}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Acerca
                    </button>

                    <button
                      onClick={goToProfile}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Perfil
                    </button>

                    <button
                      onClick={() => navigate("/chatbot")} // Aquí puedes redirigir a la vista del chatbot si tienes esta ruta definida
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Chatbot
                    </button>

                    {/* Línea divisoria antes de "Cerrar Sesión" */}
                    <hr className="my-2 border-gray-300 mt-10" />

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-b-lg"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default HeroHeader;
