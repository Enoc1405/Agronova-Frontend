import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Asegúrate de importar el archivo CSS si lo necesitas

const PlantInfo = () => {
  const { apiName } = useParams(); // Obtiene el nombre de la planta desde la URL
  const [plantData, setPlantData] = useState(null); // Estado para los datos de la planta
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const response = await fetch(`https://agronova-backend-production.up.railway.app/api/planta/${apiName}`);

        
        if (!response.ok) {
          throw new Error('Error fetching plant data');
        }

        const { data } = await response.json(); // Extraer directamente la clave "data"
        setPlantData(data.attributes); // Almacenar solo los "attributes" dentro del estado
      } catch (err) {
        setError(err.message); // Maneja el error y almacena el mensaje en el estado
      }
    };

    fetchPlantData();
  }, [apiName]);

  // Maneja el error en caso de que ocurra
  if (error) {
    return <div className="text-red-600 text-center mt-4">{error}</div>;
  }

  // Maneja el estado de carga
  if (!plantData) {
    return <div className="text-center mt-4">Cargando...</div>;
  }

  // Renderiza toda la información relevante de la planta
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
      {plantData.main_image_path && (
        <div className="text-center mb-4">
          <img
            src={plantData.main_image_path}
            alt={plantData.name}
            className="rounded-lg object-cover w-full h-60" // Imagen responsiva con bordes redondeados
          />
        </div>
      )}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">{plantData.name}</h1>
      <p className="info mb-2"><strong>Nombre binomial:</strong> {plantData.binomial_name}</p>
      <p className="info mb-2"><strong>Taxón:</strong> {plantData.taxon}</p>
      <p className="info mb-2"><strong>Descripción:</strong> {plantData.description}</p>
      {plantData.common_names && plantData.common_names.length > 0 && (
        <p className="info mb-2"><strong>Otros nombres comunes:</strong> {plantData.common_names.join(', ')}</p>
      )}
      <p className="info mb-2"><strong>Requisitos del sol:</strong> {plantData.sun_requirements}</p>
      <p className="info mb-2"><strong>Días de grado crecientes:</strong> {plantData.growing_degree_days ? `${plantData.growing_degree_days} días` : 'No disponible'}</p>
      <p className="info mb-2"><strong>Método de siembra:</strong> {plantData.sowing_method}</p>
      <p className="info mb-2"><strong>Extensión (diámetro):</strong> {plantData.spread} cm</p>
      <p className="info mb-2"><strong>Espaciado entre filas:</strong> {plantData.row_spacing} cm</p>
      <p className="info mb-2"><strong>Altura:</strong> {plantData.height} cm</p>
    </div>
  );
};

export default PlantInfo;
