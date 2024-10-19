import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Leaf, Users, BarChart2, ThumbsUp, Calendar, Droplet, Sun, Wind } from 'lucide-react';

const Estadisticas = () => {
  const [estadisticas, setEstadisticas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId'); // Obtén el userId de localStorage

      if (!userId) {
        setError("Usuario no logueado");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://agronova-backend-production.up.railway.app/api/estadisticas?user_id=${userId}`);
        setEstadisticas(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-100 to-blue-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-100 to-blue-100">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-lg animate-pulse" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 py-12 flex flex-col justify-center items-center">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-green-800 animate-fade-in-down">
        Estadísticas Agronómicas
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {estadisticas.map((item, index) => (
          <div 
            key={item.id} 
            className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 hover:rotate-1 animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="bg-green-600 p-6 relative overflow-hidden">
              <h2 className="text-2xl font-bold text-white flex items-center z-10 relative">
                <Leaf className="w-8 h-8 mr-3 animate-pulse" />
                Consulta #{item.id}
              </h2>
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-yellow-300 rounded-full opacity-50 animate-ping"></div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center text-gray-700 transition-all duration-300 hover:text-green-600 group">
                <Users className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                <span className="text-lg">Agricultor ID: {item.user_id}</span>
              </div>
              <div className="flex items-center text-gray-700 transition-all duration-300 hover:text-blue-600 group">
                <BarChart2 className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                <span className="text-lg">Consultas: {item.numero_consultas}</span>
              </div>
              <div className="flex items-center text-gray-700 transition-all duration-300 hover:text-yellow-600 group">
                <ThumbsUp className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                <span className="text-lg">Satisfacción: {item.satisfaccion_usuario}</span>
              </div>
              <div className="flex items-center text-gray-700 transition-all duration-300 hover:text-purple-600 group">
                <Calendar className="w-6 h-6 mr-3 group-hover:animate-spin" />
                <span className="text-lg">Fecha: {new Date(item.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="px-6 py-4 bg-gradient-to-r from-green-200 to-blue-200 relative overflow-hidden">
              <p className="text-lg font-semibold text-green-800 z-10 relative">
                Tema más consultado: 
                <span className="ml-2 font-bold text-blue-800">{item.temas_mas_consultados}</span>
              </p>
              <Droplet className="absolute top-0 right-0 w-12 h-12 text-blue-400 opacity-30 animate-bounce" />
              <Sun className="absolute bottom-0 left-0 w-10 h-10 text-yellow-400 opacity-30 animate-spin" />
              <Wind className="absolute top-1/2 right-1/4 w-8 h-8 text-green-400 opacity-30 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Estadisticas;
