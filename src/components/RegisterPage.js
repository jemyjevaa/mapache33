import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondoRegister from "../img/fondo_perro.jpg";

const RegisterPage = () => {
  // Estados para los campos del formulario
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Realiza la solicitud Post
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Usuario registrado exitosamente.");
      } else {
        setMessage(data.message || "Error al registrar el usuario.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Ocurrio un error al registrar el usuario");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{backgroundImage: `url(${fondoRegister})`,}}>
      <div className="w-full max-w-lg bg-white p-16 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Nuevo Usuario<span className="text-custom-204E51">Mapache 33</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 text-center">
          {/* Campo de nombre de usuario */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 text-left">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 w-[100%] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-204E51 focus:border-custom-204E51"
              placeholder="Ingresa tu nombre de usuario"
              required
            />
          </div>

          {/* Campo de correo electrónico */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-[100%] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-204E51 focus:border-custom-204E51"
              placeholder="Ingresa tu correo"
              required
            />
          </div>

          {/* Campo de contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-[100%] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-204E51 focus:border-custom-204E51"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {/* Campo de confirmación de contraseña */}
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 text-left">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 w-[100%] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-204E51 focus:border-custom-204E51"
              placeholder="Repite tu contraseña"
              required
            />
          </div>

          {/* Botón de registro */}
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-10 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out"
            >
              Crear Cuenta
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-4 text-center text-red-500">{message}</div>
        )}

        {/* Link para iniciar sesión */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">¿Ya tienes una cuenta?</span>{" "}
          <a href="/Login" className="text-sm text-custom-204E51 hover:underline">
            Inicia Sesión aquí
          </a>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
