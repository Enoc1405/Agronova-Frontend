import React from 'react';
import perfilImg from '../assets/images/fondo.jpg'; // Imagen del perfil
import userBg from '../assets/images/fondo.jpg'; // Imagen de fondo
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para manejar la navegación

const PerfilUsuario = () => {
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleBackClick = () => {
    navigate('/'); // Redirige a la ruta '/'
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token del localStorage
    navigate('/'); // Redirige a la página principal
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sección de cabecera con imagen de fondo */}
      <div className="relative h-80 w-full bg-blue-900">
        <img src={userBg} alt="Background" className="w-full h-full object-cover opacity-60" />

        {/* Botón de Regresar en la parte superior izquierda */}
        

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold">Hello Jesse</h1>
          <p className="text-lg mt-2">
            Esta es tu página de perfil. Podrás editar tu información y ver tu estadística del Chatbot de Agronova.
          </p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg">
            Editar Perfil
          </button>

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
                <label className="block text-sm font-semibold text-gray-600">Nombre usuario</label>
                <input
                  type="text"
                  value="lucky.jesse"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600">Email</label>
                <input
                  type="email"
                  value="jesse@example.com"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600">Nombre</label>
                <input
                  type="text"
                  value="Lucky"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600">Apellido</label>
                <input
                  type="text"
                  value="Jesse"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  disabled
                />
              </div>
            </div>

            {/* Información de contacto */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Información de contacto</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Dirección</label>
                  <input
                    type="text"
                    value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600">Ciudad</label>
                  <input
                    type="text"
                    value="Rivas"
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600">País</label>
                  <input
                    type="text"
                    value="Nicaragua"
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta lateral con información del usuario */}
          <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <img
              src={perfilImg} // Aquí debes reemplazar con la ruta de tu imagen
              alt="Jessica Jones"
              className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-lg"
            />
            <h3 className="mt-4 text-xl font-semibold">Jessica Jones, 27</h3>
            <p className="text-gray-500">Bucharest, Romania</p>
            <p className="mt-4 text-sm text-center text-gray-600">
              Solution Manager - Creative Tim Officer
              <br />
              University of Computer Science
            </p>
            <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg">
              Connect
            </button>
            {/* Botón de Cierre de Sesión */}
            <button
              onClick={handleLogout}
              className="mt-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Cerrar sesión
            </button>
            <div className="mt-6 text-sm text-gray-600 text-center">
              <p>Ryan — el nombre tomado por Nick Murphy, criado en Melbourne y basado en Brooklyn — escribe, interpreta y graba toda su propia música.</p>
              <a href="#" className="text-blue-500 hover:underline">Mostrar más</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
