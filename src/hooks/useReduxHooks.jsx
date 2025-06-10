import { useDispatch, useSelector } from 'react-redux';

//----------------------------
// HOOKS PERSONALIZADOS PARA REDUX
//----------------------------

/**
 * Hook personalizado para dispatch tipado
 */
export const useAppDispatch = () => useDispatch();

/**
 * Hook personalizado para selector tipado
 */
export const useAppSelector = useSelector;

/**
 * Hook para manejar productos con Redux
 */
export const useProductosRedux = () => {
  const dispatch = useAppDispatch();
  
  return {
    // Selectores
    productos: useAppSelector(state => state.productos.productos),
    loading: useAppSelector(state => state.productos.loading),
    error: useAppSelector(state => state.productos.error),
    filtros: useAppSelector(state => state.productos.filtros),
    
    // Acciones
    agregarProducto: (producto) => dispatch({ type: 'productos/agregarProducto', payload: producto }),
    setFiltros: (filtros) => dispatch({ type: 'productos/setFiltros', payload: filtros }),
    limpiarFiltros: () => dispatch({ type: 'productos/limpiarFiltros' })
  };
};

/**
 * Hook para manejar favoritos con Redux
 */
export const useFavoritosRedux = () => {
  const dispatch = useAppDispatch();
  
  return {
    // Selectores
    favoritos: useAppSelector(state => state.favoritos.favoritos),
    cantidadFavoritos: useAppSelector(state => state.favoritos.favoritos.length),
    maxFavoritos: useAppSelector(state => state.favoritos.maxFavoritos),
    
    // Funciones
    toggleFavorito: (id) => dispatch({ type: 'favoritos/toggleFavorito', payload: id }),
    agregarFavorito: (id) => dispatch({ type: 'favoritos/agregarFavorito', payload: id }),
    removerFavorito: (id) => dispatch({ type: 'favoritos/removerFavorito', payload: id }),
    limpiarFavoritos: () => dispatch({ type: 'favoritos/limpiarFavoritos' }),
    esFavorito: (id) => useAppSelector(state => state.favoritos.favoritos.includes(id))
  };
};

/**
 * Hook para manejar notificaciones con Redux
 */
export const useNotificacionesRedux = () => {
  const dispatch = useAppDispatch();
  
  return {
    // Selectores
    notificaciones: useAppSelector(state => state.notificaciones.notificaciones),
    
    // Funciones
    agregarNotificacion: (notificacion) => dispatch({ type: 'notificaciones/agregarNotificacion', payload: notificacion }),
    removerNotificacion: (id) => dispatch({ type: 'notificaciones/removerNotificacion', payload: id }),
    limpiarNotificaciones: () => dispatch({ type: 'notificaciones/limpiarNotificaciones' })
  };
};
