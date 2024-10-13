import React from "react";
import loguito from '../assets/images/Loguito.png';
import backgroundImage from '../assets/images/presentation.png';

function HeroHeader({ onLoginClick, onRegisterClick }) {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute w-full h-full object-cover top-0 left-0"
        style={{ margin: 0, padding: 0 }}
      />

      <header className="fixed top-0 left-0 right-0 mx-auto bg-white bg-opacity-100 shadow-md z-10 mt-4 h-16 rounded-3xl w-11/12"> {/* Ajustamos el ancho y el margen */}
        <div className="flex justify-between items-center p-2 h-full"> {/* Cambié el alto a h-full para que ocupe todo el espacio */}
          <div className="flex items-center space-x-4">
            <img src={loguito} alt="Logo" className="h-12 md:h-12" />

            <div className="relative hidden md:block w-96">
              <input
                type="text"
                placeholder="¿Qué quieres cultivar?"
                className="pl-4 pr-10 py-1 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <div className="absolute right-0 top-0 h-full flex items-center pr-4 bg-green-500 rounded-r-full">
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
                <a href="/" className="text-gray-700 hover:text-green-700  mr-4">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-700 hover:text-green-700  mr-4">
                  Comunidad
                </a>
              </li>
            </ul>

            <button
              onClick={onLoginClick}
              className="bg-[#20683D] text-white py-1 px-4 rounded-full hover:bg-[#1b5a31] transition-transform transform hover:scale-105 mr-10" // Agregado margin-right
            >
              Iniciar sesión
            </button>
            <button
              onClick={onRegisterClick}
              className="bg-[#20683D] text-white py-1 px-4 rounded-full hover:bg-[#1b5a31] transition-transform transform hover:scale-105  mr-10"
            >
              Registrarse
            </button>

          </div>
        </div>
      </header>
    </div>
  );
}

export default HeroHeader;
