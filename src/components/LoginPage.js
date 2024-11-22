import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondoLogin from "../img/fondo_perro.jpg"; // Asegúrate de tener esta imagen en la carpeta correcta.

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Si la respuesta es exitosa, redirige al usuario
      const data = await response.json();

      // Guarda el userId en localStorage
      localStorage.setItem("userId", data.userId);
      console.log("Login successful:", data);

      navigate("/Incio");
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Error al iniciar sesión");
    }
  };

  return (
    <section
      className="flex justify-center items-center min-h-screen bg-gray-100 py-12 bg-cover bg-center"
      style={{backgroundImage: `url(${fondoLogin})`,}}
    >
      {/* Capa de superposición para oscurecer el fondo */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Contenedor del formulario */}
      <div className="relative w-full max-w-lg bg-white p-8 rounded-lg shadow-lg z-10">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Iniciar Sesión<span className="text-custom-204E51"></span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 text-center">
          {/* Campo de correo electrónico */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-204E51 focus:border-custom-204E51"
              placeholder="Ingresa tu correo"
              required
            />
          </div>

          {/* Campo de contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-204E51 focus:border-custom-204E51"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}

          {/* Botón para iniciar sesión */}
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-10 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        {/* Link para recuperar contraseña */}
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-custom-204E51 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Registro */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">¿No tienes una cuenta?</span>{" "}
          <a href="/Register" className="text-sm text-custom-204E51 hover:underline">
            Regístrate aquí
          </a>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
