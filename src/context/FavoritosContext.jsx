import React, { createContext, useContext, useState } from 'react';

//----------------------------
// CONTEXT API PARA FAVORITOS
//----------------------------

// Crear el contexto para favoritos
const FavoritosContext = createContext();

/**
 * Hook personalizado para usar el contexto de favoritos
 * Valida que el hook se use dentro del FavoritosProvider
 */
export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error('useFavoritos debe ser usado dentro de FavoritosProvider');
  }
  return context;
};

/**
 * Provider del contexto de favoritos
 * Maneja el estado global de productos favoritos del usuario
 */
export const FavoritosProvider = ({ children }) => {
  //----------------------------
  // ESTADO LOCAL DEL CONTEXTO
  //----------------------------
  
  // Usamos Set para mejor rendimiento en operaciones de búsqueda y toggle
  const [favoritos, setFavoritos] = useState(new Set());

  //----------------------------
  // FUNCIONES DEL CONTEXTO
  //----------------------------

  // Alterna el estado de favorito de un producto
  // Si está en favoritos lo quita, si no está lo agrega
  const toggleFavorito = (productoId) => {
    setFavoritos(prev => {
      const nuevos = new Set(prev);
      // Si ya está en favoritos, lo removemos; si no, lo agregamos
      nuevos.has(productoId) ? nuevos.delete(productoId) : nuevos.add(productoId);
      return nuevos;
    });
  };

  // Verifica si un producto está marcado como favorito
  const esFavorito = (productoId) => favoritos.has(productoId);

  // Obtiene todos los IDs de productos favoritos como array
  const obtenerFavoritos = () => Array.from(favoritos);

  // Obtiene la cantidad total de productos favoritos
  const cantidadFavoritos = () => favoritos.size;

  // Agrega un producto a favoritos (sin toggle)
  const agregarFavorito = (productoId) => {
    setFavoritos(prev => new Set([...prev, productoId]));
  };

  // Remueve un producto de favoritos (sin toggle)
  const removerFavorito = (productoId) => {
    setFavoritos(prev => {
      const nuevos = new Set(prev);
      nuevos.delete(productoId);
      return nuevos;
    });
  };

  // Limpia todos los favoritos
  const limpiarFavoritos = () => {
    setFavoritos(new Set());
  };

  //----------------------------
  // VALOR DEL CONTEXTO
  //----------------------------
  
  // Objeto que se pasa a través del contexto
  const value = {
    // Estado
    favoritos,
    
    // Funciones principales
    toggleFavorito,
    esFavorito,
    
    // Funciones de consulta
    obtenerFavoritos,
    cantidadFavoritos,
    
    // Funciones de modificación directa
    agregarFavorito,
    removerFavorito,
    limpiarFavoritos
  };

  return (
    <FavoritosContext.Provider value={value}>
      {children}
    </FavoritosContext.Provider>
  );
};
