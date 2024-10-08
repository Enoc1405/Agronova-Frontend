// PlantInfo.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PlantInfo = () => {
  const { apiName } = useParams(); // Obtiene el nombre de la planta desde la URL
  const [plantData, setPlantData] = useState(null); // Estado para los datos de la planta
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/planta/${apiName}`);
        
        // Verifica si la respuesta es correcta
        if (!response.ok) {
          throw new Error('Error fetching plant data');
        }
        
        const data = await response.json();
        console.log('Plant data fetched:', data); // Imprime los datos de la planta en la consola
        setPlantData(data); // Almacena los datos de la planta en el estado
      } catch (err) {
        setError(err.message); // Maneja el error y almacena el mensaje en el estado
      }
    };

    fetchPlantData(); // Llama a la función para obtener los datos de la planta
  }, [apiName]); // Dependencia en apiName para volver a ejecutar si cambia

  // Maneja el error en caso de que ocurra
  if (error) {
    return <div>{error}</div>; // Muestra el mensaje de error
  }

  // Maneja el estado de carga
  if (!plantData) {
    return <div>Cargando...</div>; // Estado de carga
  }

  // Renderiza la información de la planta
  return (
    <div>
      <h1>{plantData.name}</h1>
      <p>{plantData.description}</p>
      <p><strong>Nombre científico:</strong> {plantData.scientificName}</p>
      <p><strong>Familia:</strong> {plantData.family}</p>
      {plantData.image && <img src={plantData.image} alt={plantData.name} />} {/* Muestra la imagen si existe */}
    </div>
  );
};

export default PlantInfo;
