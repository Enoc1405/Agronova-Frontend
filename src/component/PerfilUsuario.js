import React, { useEffect, useState } from 'react';
import Footer from "../component/Footer";
import Chatbot from "../component/Chatbot";
import { motion, AnimatePresence } from 'framer-motion';
import perfilImg from '../assets/images/fondo.jpg';
import userBg from '../assets/images/fondo.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [estadisticas, setEstadisticas] = useState(null);
  const [showEstadisticas, setShowEstadisticas] = useState(false);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate('/');
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      navigate('/InicioSesion');
      return;
    }

    try {
      const response = await fetch(`https://agronova-backend-production.up.railway.app/api/usuarios/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate('/InicioSesion');
        }
        throw new Error("Error al obtener los datos del usuario");
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      navigate('/InicioSesion');
    }
  };

  const updateUserData = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      navigate('/InicioSesion');
      return;
    }

    try {
      const response = await fetch(`https://agronova-backend-production.up.railway.app/api/usuarios/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar los datos del usuario");
      }

      setIsEditing(false);
      fetchUserData();
    } catch (error) {
      console.error("Error al actualizar los datos del usuario:", error);
    }
  };

  const fetchEstadisticas = async () => {
    if (showEstadisticas) {
      setShowEstadisticas(false);
    } else {
      try {
        const response = await axios.get('https://agronova-backend-production.up.railway.app/api/estadisticas');
        setEstadisticas(response.data);
        setShowEstadisticas(true);
      } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData) {
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
    <div className="min-h-screen bg-gray-100">
      <Chatbot />
      <div className="relative h-80 w-full bg-blue-900">
        <img src={userBg} alt="Background" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold">Hola, {userData.name}</h1>
          <p className="text-lg mt-2">
            Esta es tu página de perfil. Podrás editar tu información y ver tu estadística del Chatbot de Agronova.
          </p>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
          >
            {isEditing ? "Guardar" : "Editar Perfil"}
          </button>
          {isEditing && (
            <button
              onClick={updateUserData}
              className="mt-2 bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Guardar Cambios
            </button>
          )}
          <button
            onClick={handleBackClick}
            className="absolute top-4 left-4 bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-6 rounded-lg"
          >
            Regresar
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Mi cuenta</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">Nombre</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">Apellido</label>
                <input
                  type="text"
                  value={userData.last_name}
                  onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Información del usuario</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Dirección</label>
                  <input
                    type="text"
                    value={userData.address}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Ciudad</label>
                  <input
                    type="text"
                    value={userData.city}
                    onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600">País</label>
                  <input
                    type="text"
                    value={userData.country}
                    onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <img
              src={perfilImg}
              alt="Perfil del usuario"
              className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-lg"
            />
            <h3 className="mt-4 text-xl font-semibold">{userData.name}</h3>
            <p className="text-gray-500">{userData.city}, {userData.country}</p>
            <p className="mt-4 text-sm text-center text-gray-600">
              {userData.bio}
            </p>
            <button 
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
              onClick={fetchEstadisticas}
            >
              {showEstadisticas ? "Cerrar Estadísticas" : "Estadística"}
            </button>
            <AnimatePresence>
              {showEstadisticas && estadisticas && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 w-full bg-gray-100 p-4 rounded-lg"
                >
                  <h3 className="text-lg font-semibold mb-2">Estadísticas</h3>
                  {estadisticas.map((item) => (
                    <div key={item.id} className="mb-4 last:mb-0">
                      <p><strong>Consulta ID:</strong> {item.id}</p>
                      <p><strong>Usuario ID:</strong> {item.user_id}</p>
                      <p><strong>Número de Consultas:</strong> {item.numero_consultas}</p>
                      <p><strong>Tema Más Consultado:</strong> {item.temas_mas_consultados}</p>
                      <p><strong>Satisfacción del Usuario:</strong> {item.satisfaccion_usuario}</p>
                      <p><strong>Fecha de Creación:</strong> {new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={handleLogout}
              className="mt-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Cerrar sesión
            </button>
            <div className="mt-6 text-sm text-gray-600 text-center">
              <p>{userData.description}</p>
              <a href="#" className="text-blue-500 hover:underline">Mostrar más</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PerfilUsuario;