import React from 'react';
import { ProductosProvider } from './ProductosContext';
import { FavoritosProvider } from './FavoritosContext';

//----------------------------
// CONTEXTO PRINCIPAL DE LA APP
//----------------------------

/**
 * Provider principal que combina todos los contextos de la aplicación
 * Esto permite tener un punto central para manejar todo el estado global
 * y evita el "wrapper hell" en App.jsx
 */
export const AppProvider = ({ children }) => {
  return (
    <ProductosProvider>
      <FavoritosProvider>
        {children}
      </FavoritosProvider>
    </ProductosProvider>
  );
};

// Exportar hooks para fácil acceso
export { useProductos } from './ProductosContext';
export { useFavoritos } from './FavoritosContext';
