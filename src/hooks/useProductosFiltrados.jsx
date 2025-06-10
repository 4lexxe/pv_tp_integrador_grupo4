import { useState, useMemo, useEffect } from 'react';
import { useProductos } from '../context/AppContext.jsx';

/**
 * Hook personalizado para filtrar productos
 */
export const useProductosFiltrados = (categoria, busqueda) => {
  const { obtenerProductos } = useProductos();
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    let productos = obtenerProductos();

    if (categoria) {
      productos = productos.filter(producto => producto.categoria === categoria);
    }

    if (busqueda) {
      productos = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setProductosFiltrados(productos);
  }, [categoria, busqueda, obtenerProductos]);

  return productosFiltrados;
};