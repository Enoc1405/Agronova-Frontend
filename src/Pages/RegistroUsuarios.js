import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import '../tailwind.css';

export default function UserRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validaciones del lado del cliente
    if (name.trim() === "") {
      setError("El nombre es obligatorio.");
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("El correo electrónico no es válido.");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      setLoading(false);
      return;
    }
    if (password !== passwordConfirmation) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://agronova-backend-production.up.railway.app/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation, // Corrige aquí
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Hubo un problema al crear tu cuenta.");
        setLoading(false);
        return;
      }

   
      setSuccess("Registro exitoso. Tu cuenta ha sido creada correctamente.");
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      setLoading(false);
      navigate("/InicioSesion"); // Redirige a la página de inicio de sesión
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Hubo un problema al crear tu cuenta. Por favor, inténtalo de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Registro de Usuario</h2>
      <p className="text-center text-gray-600 mb-6">Crea una nueva cuenta para acceder a nuestros servicios.</p>
      {error && <p className="text-red-600 text-center mb-2">{error}</p>}
      {success && <p className="text-green-600 text-center mb-2">{success}</p>}
      {loading && <p className="text-center text-blue-500 mb-2">Procesando...</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-gray-700">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Tu nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-gray-700">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="tu@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-gray-700">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="passwordConfirmation" className="mb-1 text-gray-700">Confirmar Contraseña</label>
          <input
            id="passwordConfirmation"
            type="password"
            placeholder="••••••••"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
            minLength={8}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white rounded-md transition duration-200`}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
      <p className="text-center mt-4 text-gray-600">
        ¿Ya tienes una cuenta?{" "}
        <a href="/InicioSesion" className="text-blue-500 hover:underline">Inicia sesión</a>
      </p>
    </div>
  );
}
