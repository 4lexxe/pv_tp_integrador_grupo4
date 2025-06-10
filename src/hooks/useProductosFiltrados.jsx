import { useMemo } from 'react';
import { useProductos } from '../context/AppContext.jsx';

export const useProductosFiltrados = (categoria, busqueda) => {
  const { obtenerProductos } = useProductos();

  return useMemo(() => {
    let productos = obtenerProductos();

    if (categoria && categoria !== 'todas') {
      productos = productos.filter(p => p.categoria === categoria);
    }

    if (busqueda) {
      const term = busqueda.toLowerCase();
      productos = productos.filter(p =>
        p.nombre.toLowerCase().includes(term) ||
        p.descripcion.toLowerCase().includes(term)
      );
    }

    return productos;
  }, [obtenerProductos, categoria, busqueda]);
};