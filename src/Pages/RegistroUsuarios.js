import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../tailwind.css';
import Fondo from '../assets/images/fondo2.jpg'; // Asegúrate de tener la imagen correcta

export default function UserRegistration() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    if (lastName.trim() === "") {
      setError("El apellido es obligatorio.");
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
          last_name: lastName,
          email,
          password,
          password_confirmation: passwordConfirmation,
          address,
          city,
          country,
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
      setLastName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      setAddress("");
      setCity("");
      setCountry("");
      setLoading(false);
      navigate("/InicioSesion");
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Hubo un problema al crear tu cuenta. Por favor, inténtalo de nuevo.");
      setLoading(false);
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
        <div className="w-full max-w-lg">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Registro de Usuario</h2>
            <p className="text-center text-gray-600 mb-4">Crea una nueva cuenta para acceder a nuestros servicios.</p>

            {/* Mensajes de error o éxito */}
            {error && <p className="text-red-600 text-center mb-2">{error}</p>}
            {success && <p className="text-green-600 text-center mb-2">{success}</p>}
            {loading && <p className="text-center text-blue-500 mb-2">Procesando...</p>}

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              {/* Contenedor para inputs en columnas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1">Nombre</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-gray-700 mb-1">Apellido</label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Tu apellido"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
                    minLength={8}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="passwordConfirmation" className="block text-gray-700 mb-1">Confirmar Contraseña</label>
                  <input
                    id="passwordConfirmation"
                    type="password"
                    placeholder="••••••••"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    minLength={8}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-gray-700 mb-1">Dirección</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Tu dirección"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-gray-700 mb-1">Ciudad</label>
                  <input
                    id="city"
                    type="text"
                    placeholder="Tu ciudad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-gray-700 mb-1">País</label>
                  <input
                    id="country"
                    type="text"
                    placeholder="Tu país"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full p-2 ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-400"} text-white rounded-md transition duration-300`}
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>
            </form>
            <p className="text-center mt-4 text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <a href="/InicioSesion" className="text-green-500 hover:underline">Inicia sesión</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
