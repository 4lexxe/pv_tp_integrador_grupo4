import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS, APP_CONFIG, MENSAJES } from '../utils/constants';

//----------------------------
// CONTEXT API PARA FAVORITOS MEJORADO
//----------------------------

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
 * Provider del contexto de favoritos con persistencia
 * Maneja el estado global de productos favoritos del usuario
 */
export const FavoritosProvider = ({ children }) => {
  //----------------------------
  // ESTADO PERSISTENTE
  //----------------------------
  
  // Usar localStorage para persistir favoritos
  const [favoritosArray, setFavoritosArray, removeFavoritosArray] = useLocalStorage(STORAGE_KEYS.FAVORITOS, []);
  
  // Convertir array a Set para mejor rendimiento
  const [favoritos, setFavoritos] = useState(() => new Set(favoritosArray));

  // Sincronizar con localStorage cuando cambie favoritos
  useEffect(() => {
    setFavoritosArray([...favoritos]);
  }, [favoritos, setFavoritosArray]);

  //----------------------------
  // FUNCIONES DEL CONTEXTO
  //----------------------------

  // Alterna el estado de favorito de un producto con validaciones
  const toggleFavorito = (productoId, notificar = true) => {
    setFavoritos(prev => {
      const nuevos = new Set(prev);
      const yaEsFavorito = nuevos.has(productoId);
      
      if (yaEsFavorito) {
        nuevos.delete(productoId);
        if (notificar) {
          // Aquí podrías usar el hook de notificaciones
          console.log(MENSAJES.FAVORITO_REMOVIDO);
        }
      } else {
        // Validar límite máximo de favoritos
        if (nuevos.size >= APP_CONFIG.MAX_FAVORITOS) {
          console.warn(`Máximo ${APP_CONFIG.MAX_FAVORITOS} favoritos permitidos`);
          return prev;
        }
        nuevos.add(productoId);
        if (notificar) {
          console.log(MENSAJES.FAVORITO_AGREGADO);
        }
      }
      
      return nuevos;
    });
  };

  // Verifica si un producto está marcado como favorito
  const esFavorito = (productoId) => favoritos.has(productoId);

  // Obtiene todos los IDs de productos favoritos como array
  const obtenerFavoritos = () => Array.from(favoritos);

  // Obtiene la cantidad total de productos favoritos
  const cantidadFavoritos = () => favoritos.size;

  // Agrega múltiples favoritos de una vez
  const agregarFavoritos = (productosIds) => {
    setFavoritos(prev => {
      const nuevos = new Set(prev);
      productosIds.forEach(id => {
        if (nuevos.size < APP_CONFIG.MAX_FAVORITOS) {
          nuevos.add(id);
        }
      });
      return nuevos;
    });
  };

  // Agrega un producto a favoritos (sin toggle)
  const agregarFavorito = (productoId) => {
    if (favoritos.size >= APP_CONFIG.MAX_FAVORITOS) {
      console.warn(`Máximo ${APP_CONFIG.MAX_FAVORITOS} favoritos permitidos`);
      return false;
    }
    setFavoritos(prev => new Set([...prev, productoId]));
    return true;
  };

  // Remueve un producto de favoritos (sin toggle)
  const removerFavorito = (productoId) => {
    setFavoritos(prev => {
      const nuevos = new Set(prev);
      nuevos.delete(productoId);
      return nuevos;
    });
  };

  // Limpia todos los favoritos con confirmación
  const limpiarFavoritos = (confirmar = true) => {
    if (confirmar && favoritos.size > 0) {
      const confirmarLimpieza = window.confirm('¿Estás seguro de que quieres eliminar todos los favoritos?');
      if (!confirmarLimpieza) return false;
    }
    setFavoritos(new Set());
    removeFavoritosArray();
    return true;
  };

  // Exportar favoritos como JSON
  const exportarFavoritos = () => {
    const datos = {
      favoritos: obtenerFavoritos(),
      cantidad: cantidadFavoritos(),
      exportado: new Date().toISOString()
    };
    return JSON.stringify(datos, null, 2);
  };

  // Importar favoritos desde JSON
  const importarFavoritos = (jsonData) => {
    try {
      const datos = JSON.parse(jsonData);
      if (datos.favoritos && Array.isArray(datos.favoritos)) {
        setFavoritos(new Set(datos.favoritos));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al importar favoritos:', error);
      return false;
    }
  };

  // Verificar si está en el límite
  const enLimiteFavoritos = () => favoritos.size >= APP_CONFIG.MAX_FAVORITOS;

  //----------------------------
  // VALOR DEL CONTEXTO
  //----------------------------
  
  const value = {
    // Estado
    favoritos,
    
    // Funciones principales
    toggleFavorito,
    esFavorito,
    
    // Funciones de consulta
    obtenerFavoritos,
    cantidadFavoritos,
    enLimiteFavoritos,
    
    // Funciones de modificación
    agregarFavorito,
    agregarFavoritos,
    removerFavorito,
    limpiarFavoritos,
    
    // Funciones de utilidad
    exportarFavoritos,
    importarFavoritos,
    
    // Constantes útiles
    maxFavoritos: APP_CONFIG.MAX_FAVORITOS
  };

  return (
    <FavoritosContext.Provider value={value}>
      {children}
    </FavoritosContext.Provider>
  );
};
