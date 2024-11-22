import React from "react";

const AddPetModal = ({ showModal, setShowModal, newPet, handleChange, handleAddPet }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-semibold mb-6 text-center">Agregar Nueva Mascota</h3>
        <div className="space-y-6">
          {/* Input: Nombre */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre de la Mascota"
              value={newPet.nombre}
              onChange={handleChange}
              className="w-[100%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Input: Tipo */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="tipo">
              Tipo
            </label>
            <input
              type="text"
              name="tipo"
              id="tipo"
              placeholder="Tipo de Mascota (Ej: Perro, Gato)"
              value={newPet.tipo}
              onChange={handleChange}
              className="w-[100%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Input: Edad */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="edad">
              Edad
            </label>
            <input
              type="number"
              name="edad"
              id="edad"
              placeholder="Edad de la Mascota (en años)"
              value={newPet.edad}
              onChange={handleChange}
              className="w-[100%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Input: Descripción */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              name="descripcion"
              id="descripcion"
              placeholder="Descripción o notas adicionales"
              value={newPet.descripcion}
              onChange={handleChange}
              className="w-[100%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddPet}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPetModal;