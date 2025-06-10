import React from 'react';
import { ProductosProvider } from './ProductosContext';
import { FavoritosProvider } from './FavoritosContext';

//----------------------------
// CONTEXTO PRINCIPAL DE LA APP MEJORADO
//----------------------------

/**
 * Provider principal que combina todos los contextos de la aplicación
 * Proporciona acceso global a productos, favoritos y utilidades
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

// Exportar hooks personalizados
export { useLocalStorage } from '../hooks/useLocalStorage.jsx';
export { useNotificaciones } from '../hooks/useNotificaciones.jsx';
export { useProductosFiltrados } from '../hooks/useProductosFiltrados.jsx';

// Exportar constantes globales
export * from '../utils/constants.jsx';
