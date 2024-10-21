import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from "../component/Header";
import Footer from "../component/Footer";

const PlantInfo = () => {
  const { apiName } = useParams();
  const [plantData, setPlantData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const response = await fetch(`https://agronova-backend-production.up.railway.app/api/planta/${apiName}`);

        if (!response.ok) {
          throw new Error('Error fetching plant data');
        }

        const { data } = await response.json();
        setPlantData(data.attributes);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPlantData();
  }, [apiName]);

  if (error) {
    return <div className="text-red-600 text-center mt-4">{error}</div>;
  }

  if (!plantData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <motion.div
          className="text-center p-4 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-500 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l5-5-5 5v4a8 8 0 01-8 8z"
              />
            </svg>
            <span className="text-gray-700 text-lg">Cargando...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="flex max-w-6xl mx-auto mt-6 mb-20">
        {/* Columna Izquierda: Información de la Planta */}
        <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-lg">
          {plantData.main_image_path && (
            <div className="mb-6">
              <img
                src={plantData.main_image_path}
                alt={plantData.name}
                className="rounded-lg object-cover w-full h-60 transition-transform transform hover:scale-105"
              />
            </div>
          )}

          <h1 className="text-3xl font-bold text-gray-800 mb-6">{plantData.name}</h1>

          {/* Especificaciones en tarjetas */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold">Etiqueta</h2>
              <p>{plantData.label || 'No disponible'}</p>
            </div>
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold">Nombre binomial</h2>
              <p>{plantData.binomial_name}</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold">Taxón</h2>
              <p>{plantData.taxon}</p>
            </div>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold">Descripción</h2>
              <p>{plantData.description}</p>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold">Requisitos del sol</h2>
              <p>{plantData.sun_requirements}</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold">Días de grado crecientes</h2>
              <p>{plantData.growing_degree_days ? `${plantData.growing_degree_days} días` : 'No disponible'}</p>
            </div>
            <div className="bg-pink-50 border border-pink-200 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold">Método de siembra</h2>
              <p>{plantData.sowing_method}</p>
            </div>
            <div className="bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold">Extensión (diámetro)</h2>
              <p>{plantData.spread} cm</p>
            </div>
            <div className="bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold">Espaciado entre filas</h2>
              <p>{plantData.row_spacing} cm</p>
            </div>
            <div className="bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold">Altura</h2>
              <p>{plantData.height} cm</p>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Guías Relacionadas */}
        <div className="w-full md:w-1/2 p-6 bg-gray-100 rounded-lg shadow-lg ml-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Guías para este cultivo</h2>

          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Tomates en tu casa</h3>
              <p className="text-gray-600">Descubre cómo cultivar tomates en tu hogar de manera fácil y eficiente.</p>
              <button className="mt-2 text-blue-500 hover:underline">Leer más</button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Guía para cultivar tomates</h3>
              <p className="text-gray-600">Una guía completa sobre el cultivo de tomates desde la siembra hasta la cosecha.</p>
              <button className="mt-2 text-blue-500 hover:underline">Leer más</button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">El tomate de samson</h3>
              <p className="text-gray-600">Todo lo que necesitas saber sobre la variedad de tomate Samson.</p>
              <button className="mt-2 text-blue-500 hover:underline">Leer más</button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Tomate de Jeison Torres</h3>
              <p className="text-gray-600">Conoce las características y cuidados del tomate Jeison Torres.</p>
              <button className="mt-2 text-blue-500 hover:underline">Leer más</button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">La mejor forma de cultivar tomate por Monica</h3>
              <p className="text-gray-600">Consejos de cultivo de tomates de la experta Monica.</p>
              <button className="mt-2 text-blue-500 hover:underline">Leer más</button>
            </div>
          </div>
          <button 
            onClick={() => navigate('/FormularioGuia')} // Usando useNavigate para redirigir
            className="w-full text-left bg-blue-500 text-white p-3 mt-6 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            ¡Crea una guía!
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlantInfo;
