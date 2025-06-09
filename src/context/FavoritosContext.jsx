import React, { createContext, useContext, useState } from 'react';

const FavoritosContext = createContext();

export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error('useFavoritos debe ser usado dentro de FavoritosProvider');
  }
  return context;
};

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState(new Set());

  const toggleFavorito = (productoId) => {
    setFavoritos(prev => {
      const nuevos = new Set(prev);
      nuevos.has(productoId) ? nuevos.delete(productoId) : nuevos.add(productoId);
      return nuevos;
    });
  };

  const esFavorito = (productoId) => favoritos.has(productoId);

  const obtenerFavoritos = () => Array.from(favoritos);

  const cantidadFavoritos = () => favoritos.size;

  const value = {
    favoritos,
    toggleFavorito,
    esFavorito,
    obtenerFavoritos,
    cantidadFavoritos
  };

  return (
    <FavoritosContext.Provider value={value}>
      {children}
    </FavoritosContext.Provider>
  );
};
