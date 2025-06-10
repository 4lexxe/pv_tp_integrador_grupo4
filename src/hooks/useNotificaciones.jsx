//----------------------------
// HOOK PERSONALIZADO: useNotificaciones
//----------------------------

import { useState } from 'react';

/**
 * Hook personalizado para manejar notificaciones en la aplicación
 * Permite mostrar, ocultar y gestionar mensajes de notificación
 */
export const useNotificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  /**
   * Agrega una nueva notificación
   */
  const agregarNotificacion = (mensaje, tipo = 'info') => {
    const id = Date.now();
    setNotificaciones((prev) => [...prev, { id, mensaje, tipo }]);
    // Eliminar automáticamente después de 5 segundos
    setTimeout(() => eliminarNotificacion(id), 5000);
  };

  /**
   * Elimina una notificación por su ID
   */
  const eliminarNotificacion = (id) => {
    setNotificaciones((prev) => prev.filter((notificacion) => notificacion.id !== id));
  };

  return {
    notificaciones,
    agregarNotificacion,
    eliminarNotificacion,
  };
};