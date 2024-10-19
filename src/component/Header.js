import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MenuIcon, XIcon, UserIcon, InformationCircleIcon, ChatIcon, LogoutIcon, ChartBarIcon } from '@heroicons/react/solid';
import loguito from '../assets/images/Loguito.png';
import backgroundImage from '../assets/images/presentation.png';

const translationMap = {
  "tomate": "tomato",
  "lechuga": "lettuce",
  "zanahoria": "carrot",
  "pepino": "cucumber",
  // Agrega más traducciones según sea necesario
};

function HeroHeader({ onLoginClick, onRegisterClick }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú hamburguesa
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [selectedCrop, setSelectedCrop] = useState(null); // Estado para almacenar el cultivo seleccionado
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

  const goToAbout = () => {
    navigate("/About");
  }

  const goToDash = () => {
    navigate("/Dashboard");
  }

  const goToChat = () => {
    navigate("/Chat");
  }

  // Cerrar sesión (ejemplo)
  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token
    setIsAuthenticated(false); // Actualizar el estado de autenticación
    setIsMenuOpen(false); // Cerrar el menú al hacer logout
    navigate("/"); // Redirigir a la página de inicio o donde prefieras
  };

  // Manejar el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Si el término de búsqueda no está vacío, llamar a la función de búsqueda
    if (term) {
      handleSearchSubmit(term);
    } else {
      setSelectedCrop(null); // Limpiar la planta seleccionada si no hay término
    }
  };

  // Manejar la búsqueda
  const handleSearchSubmit = async (term) => {
    const translatedTerm = translationMap[term.toLowerCase()] || term; // Traducir el término

    try {
      const response = await fetch(`https://agronova-backend-production.up.railway.app/api/buscar/${translatedTerm}`);
      if (!response.ok) {
        throw new Error("Error al obtener datos de la API");
      }
      const data = await response.json();

      // Asumiendo que la respuesta contiene un objeto con los detalles del cultivo
      if (data.data) {
        setSelectedCrop(data.data); // Guardamos la planta seleccionada en el estado
      } else {
        setSelectedCrop(null); // Si no hay datos, limpiar el estado
      }
      console.log("Resultados de búsqueda:", data); // Muestra los resultados en la consola
    } catch (error) {
      console.error("Error al realizar la búsqueda: ", error);
    }
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
            <div className="relative w-96">
              <input
                type="text"
                placeholder="¿Qué quieres cultivar?"
                value={searchTerm} // Agregar valor del estado
                onChange={handleSearchChange} // Actualizamos el valor del estado y ejecutamos la búsqueda
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
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)} // Alternar el menú
                  className="flex items-center justify-center bg-green-500 rounded-full p-2 hover:bg-green-600 transition-transform transform hover:scale-105 mr-10"
                >
                  {isMenuOpen ? (
                    <XIcon className="h-6 w-6 text-white" />
                  ) : (
                    <MenuIcon className="h-6 w-6 text-white" />
                  )}
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <button
                      onClick={goToChat}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <ChatIcon className="h-5 w-5 mr-2" />
                      Chatbot
                    </button>

                    <button
                      onClick={goToDash}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <ChartBarIcon className="h-5 w-5 mr-2" />
                      DashBoard
                    </button>

                    <button
                      onClick={goToProfile}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <UserIcon className="h-5 w-5 mr-2" />
                      Perfil
                    </button>

                    <hr className="my-2 border-gray-300 mt-10" />

                    <button
                      onClick={goToAbout}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <InformationCircleIcon className="h-5 w-5 mr-2" />
                      Acerca
                    </button>

                    <button
                      onClick={goToProfile}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <InformationCircleIcon className="h-5 w-5 mr-2" />
                      Contacto
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 rounded-b-lg"
                    >
                      <LogoutIcon className="h-5 w-5 mr-2" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sección para mostrar resultados de búsqueda */}
      <div className="relative z-10 w-11/12 mx-auto mt-20"> {/* Ajusta el margen superior para que esté debajo del header */}
        {selectedCrop && (
          <div className="bg-white border border-gray-300 rounded-lg shadow-md p-3">
            <img src={selectedCrop.attributes.main_image_path} alt={selectedCrop.attributes.name} className="w-full h-24 object-cover rounded-t-lg" />
            <h3 className="text-sm font-semibold mt-1">{selectedCrop.attributes.name}</h3>
            <p className="text-gray-600 text-sm">{selectedCrop.attributes.description}</p>
            <p className="text-gray-600 text-sm"><strong>Nombre científico:</strong> {selectedCrop.attributes.binomial_name}</p>
            <p className="text-gray-600 text-sm"><strong>Requerimientos de sol:</strong> {selectedCrop.attributes.sun_requirements}</p>
            <p className="text-gray-600 text-sm"><strong>Método de siembra:</strong> {selectedCrop.attributes.sowing_method}</p>
            <p className="text-gray-600 text-sm"><strong>Altura:</strong> {selectedCrop.attributes.height} cm</p>
          </div>
        )}
        {searchTerm && !selectedCrop && (
          <div className="bg-white border border-gray-300 rounded-lg shadow-md p-3">
            <p className="text-gray-500 text-sm">No se encontraron resultados para "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroHeader;
