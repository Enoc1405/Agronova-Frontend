import React from 'react';
import loguito from '../assets/images/Loguito.png';  
import backgroundImage from '../assets/images/presentation.png';  

function Header({ onLoginClick, onRegisterClick }) {
  return (
    <div className="relative w-full h-[400px]"> 

      <img 
        src={backgroundImage} 
        alt="Background" 
        className="absolute w-full h-full object-cover" 
      />

     
      <header className="relative z-10 bg-white bg-opacity-100 shadow-md w-3/4 mx-auto rounded-full"> 
      <div className="flex justify-between items-center p-2"> 
          {/* Logo y barra de búsqueda */}
          <div className="flex items-center space-x-4"> 
            {/* Logo */}
            <img src={loguito} alt="Agrónova Logo" className="h-12 md:h-16" /> 

            {/* Barra de búsqueda */}
            <div className="relative hidden md:block w-64"> 
              <input
                type="text"
                placeholder="¿Qué quieres cultivar?"
                className="pl-10 pr-4 py-1 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M8.5 14a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
                />
              </svg>
            </div>
          </div>

          {/* Menú de navegación y botones */}
          <div className="flex items-center space-x-4"> {/* Reducir espacio entre elementos */}
            <ul className="hidden md:flex space-x-4">
              <li>
                <a href="/" className="text-gray-700 hover:text-green-700">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-700 hover:text-green-700">
                  Comunidad
                </a>
              </li>
            </ul>

            <button
              onClick={onLoginClick}
              className="bg-[#20683D] text-white py-1 px-4 rounded-full hover:bg-[#1b5a31] transition-transform transform hover:scale-105"
            >
              Iniciar sesión
            </button>
            <button
              onClick={onRegisterClick}
              className="bg-[#20683D] text-white py-1 px-4 rounded-full hover:bg-[#1b5a31] transition-transform transform hover:scale-105"
            >
              Registrarse
            </button>
          </div>
        </div>
      </header>

      {/* Logo grande centrado, puedes ajustar el tamaño aquí si lo deseas */}
      <div className="absolute inset-0 flex justify-center items-center z-0">
       
      </div>
    </div>
  );
}

export default Header;
