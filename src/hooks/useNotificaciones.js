import { useState, useCallback } from 'react';

//----------------------------
// HOOK PARA NOTIFICACIONES GLOBALES
//----------------------------

/**
 * Hook personalizado para manejar notificaciones/snackbars
 * Permite mostrar mensajes de éxito, error, info y advertencia
 */
export const useNotificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  // Agregar nueva notificación
  const agregarNotificacion = useCallback((mensaje, tipo = 'info', duracion = 3000) => {
    const id = Date.now() + Math.random();
    const nuevaNotificacion = {
      id,
      mensaje,
      tipo, // 'success', 'error', 'warning', 'info'
      duracion,
      timestamp: new Date()
    };

    setNotificaciones(prev => [...prev, nuevaNotificacion]);

    // Auto-remover después de la duración especificada
    if (duracion > 0) {
      setTimeout(() => {
        removerNotificacion(id);
      }, duracion);
    }

    return id;
  }, []);

  // Remover notificación específica
  const removerNotificacion = useCallback((id) => {
    setNotificaciones(prev => prev.filter(notif => notif.id !== id));
  }, []);

  // Limpiar todas las notificaciones
  const limpiarNotificaciones = useCallback(() => {
    setNotificaciones([]);
  }, []);

  // Métodos de conveniencia
  const notificarExito = useCallback((mensaje, duracion) => {
    return agregarNotificacion(mensaje, 'success', duracion);
  }, [agregarNotificacion]);

  const notificarError = useCallback((mensaje, duracion) => {
    return agregarNotificacion(mensaje, 'error', duracion);
  }, [agregarNotificacion]);

  const notificarInfo = useCallback((mensaje, duracion) => {
    return agregarNotificacion(mensaje, 'info', duracion);
  }, [agregarNotificacion]);

  const notificarAdvertencia = useCallback((mensaje, duracion) => {
    return agregarNotificacion(mensaje, 'warning', duracion);
  }, [agregarNotificacion]);

  return {
    notificaciones,
    agregarNotificacion,
    removerNotificacion,
    limpiarNotificaciones,
    notificarExito,
    notificarError,
    notificarInfo,
    notificarAdvertencia
  };
};
