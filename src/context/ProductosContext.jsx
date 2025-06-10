import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useCrossTabSync } from '../hooks/useCrossTabSync.jsx';
import { useApi } from '../hooks/useApi.jsx';
import productService from '../services/productService.jsx';

const ProductosContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) throw new Error('useProductos debe usarse dentro de ProductosProvider');
  return context;
};

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [productosLocales, setProductosLocales] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const { loading, error, execute } = useApi();

  // Sincronización entre pestañas
  const handleMessage = useCallback((message) => {
    if (message.type === 'PRODUCTOS_UPDATE') {
      setProductos(message.productos);
    } else if (message.type === 'PRODUCTOS_LOCALES_UPDATE') {
      setProductosLocales(message.productosLocales);
    }
  }, []);

  const { sendMessage } = useCrossTabSync('productos-sync', handleMessage);

  // Cargar productos de la API al iniciar
  useEffect(() => {
    cargarProductosDeAPI();
    cargarCategorias();
  }, []);

  // Notificar cambios a otras pestañas
  const notificarCambio = useCallback((nuevosProductos, tipo = 'PRODUCTOS_UPDATE') => {
    sendMessage({
      type: tipo,
      productos: tipo === 'PRODUCTOS_UPDATE' ? nuevosProductos : undefined,
      productosLocales: tipo === 'PRODUCTOS_LOCALES_UPDATE' ? nuevosProductos : undefined,
      timestamp: Date.now()
    });
  }, [sendMessage]);

  // Cargar productos desde la API
  const cargarProductosDeAPI = useCallback(async () => {
    try {
      const productosAPI = await execute(() => productService.getAllProducts());
      setProductos(productosAPI);
    } catch (err) {
      console.error('Error cargando productos de la API:', err);
      // Fallback a productos locales si falla la API
      setProductos([]);
    }
  }, [execute]);

  // Cargar categorías desde la API
  const cargarCategorias = useCallback(async () => {
    try {
      const categoriasAPI = await execute(() => productService.getCategories());
      setCategorias(categoriasAPI);
    } catch (err) {
      console.error('Error cargando categorías:', err);
      setCategorias(['Electrónicos', 'Ropa Masculina', 'Ropa Femenina', 'Joyería']);
    }
  }, [execute]);

  // Obtener todos los productos (API + locales)
  const obtenerProductos = useCallback(() => {
    return [...productos, ...productosLocales];
  }, [productos, productosLocales]);

  // Buscar producto por ID (API + locales)
  const obtenerProductoPorId = useCallback((id) => {
    return obtenerProductos().find(p => p.id === id);
  }, [obtenerProductos]);

  // Filtrar por categoría
  const obtenerProductosPorCategoria = useCallback((categoria) => {
    return obtenerProductos().filter(p => p.categoria === categoria);
  }, [obtenerProductos]);

  // Obtener categorías (API + locales)
  const obtenerCategorias = useCallback(() => {
    const categoriasLocales = [...new Set(productosLocales.map(p => p.categoria))];
    return [...new Set([...categorias, ...categoriasLocales])];
  }, [categorias, productosLocales]);

  // Buscar productos
  const buscarProductos = useCallback((termino) => {
    return productService.searchProducts(obtenerProductos(), termino);
  }, [obtenerProductos]);

  // Agregar producto local (no a la API)
  const agregarProducto = useCallback(async (nuevoProducto) => {
    try {
      const id = Math.max(
        ...obtenerProductos().map(p => p.id),
        1000 // Empezar IDs locales desde 1000
      ) + 1;
      
      const productoConId = { ...nuevoProducto, id, esLocal: true };
      const nuevosLocales = [...productosLocales, productoConId];
      
      setProductosLocales(nuevosLocales);
      notificarCambio(nuevosLocales, 'PRODUCTOS_LOCALES_UPDATE');
      
      return productoConId;
    } catch (error) {
      throw new Error('Error al agregar producto');
    }
  }, [productosLocales, obtenerProductos, notificarCambio]);

  // Actualizar producto (solo locales)
  const actualizarProducto = useCallback(async (id, datosActualizados) => {
    try {
      // Solo permitir editar productos locales
      const productoExistente = productosLocales.find(p => p.id === id);
      if (!productoExistente) {
        throw new Error('Solo se pueden editar productos creados localmente');
      }

      const nuevosLocales = productosLocales.map(p => 
        p.id === id ? { ...p, ...datosActualizados } : p
      );
      
      setProductosLocales(nuevosLocales);
      notificarCambio(nuevosLocales, 'PRODUCTOS_LOCALES_UPDATE');
      
      return nuevosLocales.find(p => p.id === id);
    } catch (error) {
      throw error;
    }
  }, [productosLocales, notificarCambio]);

  // Eliminar producto (solo locales)
  const eliminarProducto = useCallback(async (id) => {
    try {
      const productoExistente = productosLocales.find(p => p.id === id);
      if (!productoExistente) {
        throw new Error('Solo se pueden eliminar productos creados localmente');
      }

      const nuevosLocales = productosLocales.filter(p => p.id !== id);
      setProductosLocales(nuevosLocales);
      notificarCambio(nuevosLocales, 'PRODUCTOS_LOCALES_UPDATE');
      
      return true;
    } catch (error) {
      throw error;
    }
  }, [productosLocales, notificarCambio]);

  // Refrescar productos de la API
  const refrescarProductos = useCallback(async () => {
    await cargarProductosDeAPI();
    await cargarCategorias();
  }, [cargarProductosDeAPI, cargarCategorias]);

  const value = {
    productos: obtenerProductos(),
    productosAPI: productos,
    productosLocales,
    loading,
    error,
    obtenerProductos,
    obtenerProductoPorId,
    obtenerProductosPorCategoria,
    obtenerCategorias,
    buscarProductos,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
    cargarProductos: cargarProductosDeAPI,
    refrescarProductos
  };

  return <ProductosContext.Provider value={value}>{children}</ProductosContext.Provider>;
};
