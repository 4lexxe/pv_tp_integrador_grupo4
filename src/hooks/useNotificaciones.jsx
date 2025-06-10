import { useState } from 'react';

export const useNotificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  const agregarNotificacion = (mensaje, tipo = 'info') => {
    const id = Date.now();
    setNotificaciones(prev => [...prev, { id, mensaje, tipo }]);
    setTimeout(() => eliminarNotificacion(id), 5000);
  };

  const eliminarNotificacion = (id) => {
    setNotificaciones(prev => prev.filter(n => n.id !== id));
  };

  return { notificaciones, agregarNotificacion, eliminarNotificacion };
};