import React from 'react';
import { ProductosProvider } from './ProductosContext';
import { FavoritosProvider } from './FavoritosContext';

export const AppProvider = ({ children }) => (
  <ProductosProvider>
    <FavoritosProvider>
      {children}
    </FavoritosProvider>
  </ProductosProvider>
);

export { useProductos } from './ProductosContext';
export { useFavoritos } from './FavoritosContext';
