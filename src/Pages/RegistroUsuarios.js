import React, { useState } from "react";
import '../tailwind.css'; // Esto es correcto si estás en src/pages

export default function UserRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== passwordConfirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Datos de registro:", { name, email, password });
      setSuccess("Registro exitoso. Tu cuenta ha sido creada correctamente.");
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (error) {
      setError("Hubo un problema al crear tu cuenta. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Registro de Usuario</h2>
      <p className="text-center text-gray-600 mb-6">Crea una nueva cuenta para acceder a nuestros servicios.</p>
      {error && <p className="text-red-600 text-center mb-2">{error}</p>}
      {success && <p className="text-green-600 text-center mb-2">{success}</p>}
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
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
          Registrarse
        </button>
      </form>
      <p className="text-center mt-4 text-gray-600">
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" className="text-blue-500 hover:underline">Inicia sesión</a>
      </p>
    </div>
  );
}
