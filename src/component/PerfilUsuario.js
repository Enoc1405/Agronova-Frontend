import React, { useEffect, useState } from 'react';
import Footer from "../component/Footer";
import { motion } from 'framer-motion';
import perfilImg from '../assets/images/fondo.jpg'; // Imagen del perfil
import userBg from '../assets/images/fondo.jpg'; // Imagen de fondo
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para manejar la navegación

const PerfilUsuario = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar el modo de edición

  const handleBackClick = () => {
    navigate('/'); // Redirige a la ruta '/'
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token del localStorage
    localStorage.removeItem("userId"); // Elimina el ID del usuario
    navigate('/'); // Redirige a la página principal
  };

  // Función para obtener los datos del usuario
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // Obtiene el ID del usuario

    if (!token) {
      navigate('/InicioSesion'); // Redirige si no hay token
      return;
    }

    try {
      const response = await fetch(`https://agronova-backend-production.up.railway.app/api/usuarios/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Incluye el token en los encabezados
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token"); // Elimina el token
          localStorage.removeItem("userId"); // Elimina el ID del usuario
          navigate('/InicioSesion'); // Redirige al inicio de sesión
        }
        throw new Error("Error al obtener los datos del usuario");
      }

      const data = await response.json();

      setUserData(data); // Actualiza el estado con los datos del usuario
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      navigate('/InicioSesion'); // Redirige en caso de error
    }
  };

  // Función para actualizar los datos del usuario
  const updateUserData = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // Obtiene el ID del usuario

    if (!token) {
      navigate('/InicioSesion'); // Redirige si no hay token
      return;
    }

    try {
      const response = await fetch(`https://agronova-backend-production.up.railway.app/api/usuarios/${userId}`, {
        method: "PUT", // Cambia a PUT para actualizar
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(userData), // Envía los datos del usuario actualizados
      });

      if (!response.ok) {
        throw new Error("Error al actualizar los datos del usuario");
      }

      // Actualiza el estado para desactivar el modo de edición
      setIsEditing(false);
      fetchUserData(); // Obtiene nuevamente los datos del usuario para reflejar los cambios
    } catch (error) {
      console.error("Error al actualizar los datos del usuario:", error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Llama a la función para obtener los datos del usuario al cargar el componente
  }, []);


  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <motion.div
          className="text-center p-4 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }} // Estado inicial de la animación
          animate={{ opacity: 1, scale: 1 }} // Estado final de la animación
          transition={{ duration: 0.3 }} // Duración de la animación
        >
          <div className="flex items-center justify-center">
            {/* Aquí puedes agregar un ícono de carga o un spinner */}
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
      {/* Sección de cabecera con imagen de fondo */}
      <div className="relative h-80 w-full bg-blue-900">
        <img src={userBg} alt="Background" className="w-full h-full object-cover opacity-60" />

        {/* Botón de Regresar en la parte superior izquierda */}


        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold">Hola, {userData.name}</h1>
          <p className="text-lg mt-2">
            Esta es tu página de perfil. Podrás editar tu información y ver tu estadística del Chatbot de Agronova.
          </p>
          <button
            onClick={() => setIsEditing(!isEditing)} // Alterna el modo de edición
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
          >
            {isEditing ? "Guardar" : "Editar Perfil"}
          </button>
          {isEditing && (
            <button
              onClick={updateUserData} // Llama a la función para guardar los cambios
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

      {/* Sección principal con detalles de la cuenta */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Información del perfil del usuario */}
          <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Mi cuenta</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Información del usuario */}
              <div>
                <label className="block text-sm font-semibold text-gray-600">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })} // Maneja el cambio de email
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  disabled={!isEditing} // Desactiva el campo si no está en modo edición
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600">Nombre</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })} // Maneja el cambio de nombre
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  disabled={!isEditing} // Desactiva el campo si no está en modo edición
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600">Apellido</label>
                <input
                  type="text"
                  value={userData.last_name} // Cambia según el nombre de tu propiedad
                  onChange={(e) => setUserData({ ...userData, last_name: e.target.value })} // Maneja el cambio de apellido
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  disabled={!isEditing} // Desactiva el campo si no está en modo edición
                />
              </div>
            </div>

            {/* Información de contacto */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Información del usuario</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Dirección</label>
                  <input
                    type="text"
                    value={userData.address}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })} // Maneja el cambio de dirección
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                    disabled={!isEditing} // Desactiva el campo si no está en modo edición
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600">Ciudad</label>
                  <input
                    type="text"
                    value={userData.city}
                    onChange={(e) => setUserData({ ...userData, city: e.target.value })} // Maneja el cambio de ciudad
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                    disabled={!isEditing} // Desactiva el campo si no está en modo edición
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600">País</label>
                  <input
                    type="text"
                    value={userData.country}
                    onChange={(e) => setUserData({ ...userData, country: e.target.value })} // Maneja el cambio de país
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                    disabled={!isEditing} // Desactiva el campo si no está en modo edición
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta lateral con información del usuario */}
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
            <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg">
              Estadística
            </button>
            {/* Botón de Cierre de Sesión */}
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
