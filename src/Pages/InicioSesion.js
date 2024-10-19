import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Fondo from '../assets/images/fondoinicio.jpg'; // Importa la imagen

export default function SignInSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga

  const navigate = useNavigate(); // Inicializa useNavigate para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // Inicia la carga

    try {
      const response = await fetch("https://agronova-backend-production.up.railway.app/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      const data = await response.json();
      console.log("Datos de login:", data);

      setSuccess("Inicio de sesión exitoso.");

      // Almacena el token y el ID del usuario en el localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id); // Aquí asume que la respuesta incluye el ID del usuario

      navigate("/"); // Redirige a la página principal

      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message || "Hubo un problema al iniciar sesión. Inténtalo nuevamente.");
    } finally {
      setLoading(false); // Termina la carga
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sección de la imagen */}
      <div className="hidden md:block md:w-3/5"> 
        <div className="h-full" style={{ backgroundImage: `url(${Fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      </div>
      {/* Sección del formulario */}
      <div className="w-full md:w-2/5 flex items-center justify-center bg-white p-6"> 
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-500 text-white mb-4">
              <span className="text-2xl">🔒</span> {/* Icono de bloqueo */}
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Iniciar Sesión</h2>
            <p className="text-center text-gray-600 mb-4">Ingresa tus credenciales para acceder a tu cuenta.</p>

            {/* Mensajes de error o éxito */}
            {error && <p className="text-red-500 text-center mb-4" role="alert">{error}</p>}
            {success && <p className="text-green-500 text-center mb-4" role="alert">{success}</p>}

            {/* Formulario de inicio de sesión */}
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-1">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center mb-4">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-700">Recordarme</label>
              </div>
              <button 
                type="submit" 
                className={`w-full p-2 rounded-md text-white transition duration-300 ${loading ? "bg-gray-500" : "bg-green-500 hover:bg-green-400"}`} 
                disabled={loading} // Desactiva el botón mientras está cargando
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white mr-2"
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
                    Cargando...
                  </div>
                ) : (
                  "Iniciar Sesión"
                )}
              </button>
              {/* Contenedor flex para enlaces */}
              <div className="flex justify-between mt-4">
                <a href="#" className="text-green-800 hover:underline">¿Olvidaste tu contraseña?</a>
                <a href="/registrousuarios" className="text-green-800 hover:underline">¿No tienes una cuenta? Regístrate</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
