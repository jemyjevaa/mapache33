import React from "react";

const ErrorModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h3 className="text-lg font-semibold text-red-600">¡Error al enviar los datos!</h3>
        <p className="text-gray-600 mt-2">
          No se pudo registrar la mascota en el servidor. Sin embargo, se guardó localmente en IndexedDB. El sistema intentará sincronizarlo más tarde.
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
