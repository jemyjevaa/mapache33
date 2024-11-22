import React, { useState } from "react";
import { Link } from "react-router-dom";
import gato_fondo from "../img/gato_fondo.jpg";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative h-[100%] m-0 p-0">
      {/* Fondo de imagen */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{
          backgroundImage: `url(${gato_fondo})`,
        }}
      ></div>

      {/* Capa de superposición para oscurecer la imagen */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Barra de navegación */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-transparent">
        <h1 className="text-white text-2xl font-bold drop-shadow-md">Mapache 33</h1>

        {/* Botón de menú para pantallas pequeñas */}
        <button 
          className="block text-white md:hidden" 
          onClick={toggleMenu}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-8 h-8" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16m-7 6h7" 
            />
          </svg>
        </button>

        {/* Opciones de navegación para pantallas grandes */}
        <div className="hidden md:flex space-x-4">
          <Link to="/Register">
            <button className="px-4 py-2 font-medium text-white bg-black rounded-md">
              Registrarse
            </button>
          </Link>
          <Link to="/Login">
            <button className="px-4 py-2 font-medium text-white bg-black rounded-md">
              Iniciar Sesión
            </button>
          </Link>
        </div>
      </nav>

      {/* Menú lateral (visible en pantallas pequeñas) */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-20`}
      >
        <div className="flex flex-col h-full p-6 text-white">
          <button 
            className="self-end text-white mb-4" 
            onClick={toggleMenu}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-6 h-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
          <Link to="/Register">
            <button className="px-4 py-2 mb-4 font-medium text-white bg-black rounded-md ">
              Registrarse
            </button>
          </Link>
          <Link to="/Login">
            <button className="px-4 py-2 font-medium text-white bg-black rounded-md ">
              Iniciar Sesión
            </button>
          </Link>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative flex flex-col items-center justify-center min-h-screen text-center text-white z-10">
        <h1 className="text-5xl font-bold drop-shadow-md md:text-6xl">
          Mapache 33
        </h1>
        <p className="mt-4 text-lg font-medium drop-shadow-sm md:text-xl">
          ¿Se te olvidadan los nombres de tus mascotas? Guarda aquí el nombre de tu mascota.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
