import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la redirección

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const navigate = useNavigate(); // Inicializa useNavigate para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Realizamos la solicitud de inicio de sesión a la API
      const response = await fetch("https://agronova-backend-production.up.railway.app/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Obtén el mensaje de error del servidor
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      const data = await response.json();
      console.log("Datos de login:", data);

      // Si el inicio de sesión es exitoso
      setSuccess("Inicio de sesión exitoso.");
      localStorage.setItem('token', data.token); // Guardamos el token en el almacenamiento local

      // Redirigimos al usuario a la página de inicio
      navigate("/"); // Cambia la ruta según lo que necesites

      // Limpiamos el formulario
      setEmail("");
      setPassword("");
    } catch (error) {
      // Si ocurre un error, lo mostramos al usuario
      setError(error.message || "Hubo un problema al iniciar sesión. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Iniciar Sesión</h2>
        <p className="text-center text-gray-600 mb-6">Ingresa tus credenciales para acceder a tu cuenta.</p>
        
        {/* Mostramos mensajes de error o éxito */}
        {error && <p className="text-red-500 text-center mb-4" role="alert">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4" role="alert">{success}</p>}
        
        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
            Iniciar Sesión
          </button>
        </form>
        
        {/* Enlace para registrar una nueva cuenta */}
        <p className="text-center text-gray-600 mt-4">
          ¿No tienes una cuenta?{" "}
          <a href="/registrousuarios" className="text-blue-600 hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
