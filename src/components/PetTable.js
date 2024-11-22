import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconPlus, IconEdit, IconTrash } from "@tabler/icons-react";
import AddPetModal from "./AddPetModal";
import ErrorModal from "./ErrorModal";

const PetTable = () => {
  const [pets, setPets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPet, setNewPet] = useState({
    nombre: "",
    tipo: "",
    edad: "",
    descripcion: "",
  });
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Obtener mascotas de la API
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get("https://mapache-server-1.onrender.com/get_passwords", {
        headers: { userId },
      })
      .then((response) => setPets(response.data))
      .catch((error) => console.error("Error al obtener contraseñas", error));

      if (!localStorage.getItem('isSubscribed')) {
        subscribeToNotifications();
        localStorage.setItem('isSubscribed', 'true');
      }
  }, []);

  const handleChange = (e) => {
    setNewPet({ ...newPet, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario del modal
const handleAddPet = async () => {
    const userId = localStorage.getItem("userId"); 

    if (!userId) {
      console.error("Error: No se ha encontrado el ID de usuario."); 
      return;
    }

    const petToSend = {
      nombre: newPet.nombre,
      tipo: newPet.tipo,
      edad: newPet.edad,
      descripcion: newPet.descripcion,
      userId: userId,
    };

    console.log("Enviando datos al servidor:", petToSend);

   try{
    const response = await fetch('https://mapache-server-1.onrender.com/post_pets', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(petToSend)
    }); 

    if (!response.ok){
      const errorData = await response.json();
      throw new Error(`Error en la API: ${errorData.message}`);
    }

    const data = await response.json();

     // Actualiza la lista de mascotas con la nueva
     setPets([...pets, data]);
     setShowModal(false); // Cierra el modal
     setNewPet({ nombre: '', tipo: '', edad: '', descripcion: '' });

     await fetch('https://mapache-server-1.onrender.com/sendNotification', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        userId: userId, 
        message: `Se ha registrado la mascota con el nombre ${newPet.nombre}.`,
      }),
     });

     console.log("Notificación push enviada correctamente");
   } catch (error){
    console.error('Error en la petición, guardando localmente:', error);

    if('serviceWorker' in navigator && 'SyncManager' in window){
      try{
        const sw = await navigator.serviceWorker.ready; 
        await sw.sync.register('sync-pets');
        console.log('Sincronización registrada'); 
      } catch(err){
        console.error('Error al registrar la sincronización', err); 
      }
    }

    try{
      await savePetToIndexedDB(petToSend);
      console.log('Tarea guardada en IndexedDB debido a la falla en la red'); 
      setShowErrorModal(true);
    } catch (err){
      console.error('Error al guardar en IndexedDB:', err);
    }
   }
  }; 
  
  // Función para guardar la mascota en IndexedDB
  const savePetToIndexedDB = (pet) => {
    return new Promise((resolve, reject) => {
      let dbRequest = indexedDB.open('petDB');
  
      dbRequest.onupgradeneeded = event => {
        let db = event.target.result;
        if (!db.objectStoreNames.contains('pets')) {
          db.createObjectStore('pets', { keyPath: 'id', autoIncrement: true });
        }
      };
  
      dbRequest.onsuccess = event => {
        let db = event.target.result;
        let transaction = db.transaction('pets', 'readwrite');
        let objectStore = transaction.objectStore('pets');
        let addRequest = objectStore.add(pet);
  
        addRequest.onsuccess = () => {
          resolve();
        };
  
        addRequest.onerror = () => {
          reject('Error al guardar en IndexedDB');
        };
      };
  
      dbRequest.onerror = () => {
        reject('Error al abrir IndexedDB');
      };
    });
  };
  
  const deletePet = (id) => {
    axios.delete(`http://localhost:4000/delete/${id}`)
      .then(() => setPets(pets.filter((pet) => pet._id !== id)))
      .catch((error) => console.error("Error al eliminar mascota:", error));
  };

  async function subscribeToNotifications() {
    const userId = localStorage.getItem("userId");
  
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
  
        // Verificar si ya existe una suscripción
        const existingSubscription = await registration.pushManager.getSubscription();
        if (existingSubscription) {
          console.log("El usuario ya está suscrito");
          return;
        }
  
        // Solicitar permiso para notificaciones
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const newSubscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: "BOUKMtuCea0YgGZ3nGNekNnNKw9WmHnOx9hKxY4umoh2V5_DcWdDzyfFXD3GBFaeckEkWFKi60clrBA7zYpJCWE"
          });
  
          // Formatear los datos de suscripción junto con userId
          const subscriptionData = {
            ...newSubscription.toJSON(),
            userId 
          };
  
          // Enviar la suscripción a la API
          const response = await fetch('https://mapache-server-1.onrender.com/suscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscriptionData)
          });
  
          if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
          }
  
          const data = await response.json();
          console.log('Suscripción guardada en la BD', data);
        } else {
          console.log("Permiso para notificaciones denegado");
        }
      } catch (error) {
        console.error('Error en el proceso de suscripción', error);
      }
    } else {
      console.log("El navegador no soporta Service Worker o Push Notifications");
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <h2 className="text-3xl font-bold text-gray-800">Tus Mascotas</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white py-2 px-4 rounded-lg flex items-center space-x-2"
        >
          <IconPlus size={20} />
          <span>Agregar Mascota</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pets.map((pet) => (
          <div
            key={pet._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col justify-between space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-800">{pet.nombre}</h3>
            <p className="text-gray-600">{pet.tipo}</p>
            <p className="text-gray-600">{pet.edad} años</p>
            <p className="text-gray-600">{pet.descripcion}</p>
            <div className="flex justify-between mt-4">
              <button className="text-gray-600 hover:text-blue-700 transition">
                <IconEdit size={20} />
              </button>
              <button
                className="text-gray-600 hover:text-blue-700 transition"
                onClick={() => deletePet(pet._id)}
              >
                <IconTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para agregar nueva mascota */}
      <AddPetModal
        showModal={showModal}
        setShowModal={setShowModal}
        newPet={newPet}
        handleChange={handleChange}
        handleAddPet={handleAddPet}
      />

      <ErrorModal 
        show={showErrorModal} 
        onClose={() => setShowErrorModal(false)} 
      />
    
    </div>
  );
};

export default PetTable;
