import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.jsx';
import { useCrossTabSync } from '../hooks/useCrossTabSync.jsx';
import { STORAGE_KEYS, APP_CONFIG } from '../utils/constants.jsx';

const FavoritosContext = createContext();

export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) throw new Error('useFavoritos debe usarse dentro de FavoritosProvider');
  return context;
};

export const FavoritosProvider = ({ children }) => {
  const [favoritosArray, setFavoritosArray, removeFavoritosArray] = useLocalStorage(STORAGE_KEYS.FAVORITOS, []);
  const [favoritos, setFavoritos] = useState(() => new Set(favoritosArray));
  const isUpdating = useRef(false);

  useEffect(() => {
    if (!isUpdating.current) {
      const newArray = [...favoritos];
      if (JSON.stringify(newArray) !== JSON.stringify(favoritosArray)) {
        setFavoritosArray(newArray);
      }
    }
    isUpdating.current = false;
  }, [favoritos]);

  const handleMessage = useCallback((message) => {
    if (message.type === 'FAVORITOS_UPDATE' || 
        (message.type === 'STORAGE_UPDATE' && message.key === STORAGE_KEYS.FAVORITOS)) {
      isUpdating.current = true;
      setFavoritos(new Set(message.favoritos || message.data));
    }
  }, []);

  const { sendMessage } = useCrossTabSync('favoritos-sync', handleMessage);

  const notificarCambio = useCallback((nuevos) => {
    sendMessage({ type: 'FAVORITOS_UPDATE', favoritos: [...nuevos], timestamp: Date.now() });
  }, [sendMessage]);

  const toggleFavorito = useCallback((productoId) => {
    setFavoritos(prev => {
      const nuevos = new Set(prev);
      if (nuevos.has(productoId)) {
        nuevos.delete(productoId);
      } else if (nuevos.size < APP_CONFIG.MAX_FAVORITOS) {
        nuevos.add(productoId);
      } else {
        return prev;
      }
      notificarCambio(nuevos);
      return nuevos;
    });
  }, [notificarCambio]);

  const limpiarFavoritos = useCallback(() => {
    if (favoritos.size > 0 && !window.confirm('¿Eliminar todos los favoritos?')) return false;
    const nuevos = new Set();
    setFavoritos(nuevos);
    removeFavoritosArray();
    notificarCambio(nuevos);
    return true;
  }, [favoritos.size, removeFavoritosArray, notificarCambio]);

  const exportarFavoritos = () => JSON.stringify({
    favoritos: [...favoritos],
    cantidad: favoritos.size,
    exportado: new Date().toISOString()
  }, null, 2);

  const importarFavoritos = useCallback((jsonData) => {
    try {
      const { favoritos: importedFavoritos } = JSON.parse(jsonData);
      if (Array.isArray(importedFavoritos)) {
        const nuevos = new Set(importedFavoritos);
        setFavoritos(nuevos);
        notificarCambio(nuevos);
        return true;
      }
    } catch (error) {
      console.error('Error importing favorites:', error);
    }
    return false;
  }, [notificarCambio]);

  const value = {
    favoritos,
    toggleFavorito,
    esFavorito: (id) => favoritos.has(id),
    obtenerFavoritos: () => [...favoritos],
    cantidadFavoritos: () => favoritos.size,
    enLimiteFavoritos: () => favoritos.size >= APP_CONFIG.MAX_FAVORITOS,
    limpiarFavoritos,
    exportarFavoritos,
    importarFavoritos,
    maxFavoritos: APP_CONFIG.MAX_FAVORITOS
  };

  return <FavoritosContext.Provider value={value}>{children}</FavoritosContext.Provider>;
};
