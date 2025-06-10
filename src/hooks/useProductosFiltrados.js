import { useState, useMemo } from 'react';
import { useProductos } from '../context/AppContext';

//----------------------------
// HOOK PARA FILTRAR PRODUCTOS
//----------------------------

/**
 * Hook personalizado para filtrar y buscar productos
 * Proporciona funcionalidad de búsqueda, filtrado y ordenamiento reutilizable
 */
export const useProductosFiltrados = () => {
  const { obtenerProductos, obtenerCategorias } = useProductos();
  
  // Estados para filtros
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');
  const [ordenamiento, setOrdenamiento] = useState('nombre'); // 'nombre', 'precio', 'categoria'
  const [direccionOrden, setDireccionOrden] = useState('asc'); // 'asc', 'desc'

  // Productos filtrados y ordenados (memoizados para rendimiento)
  const productosFiltrados = useMemo(() => {
    let productos = obtenerProductos();

    // Aplicar búsqueda por término
    if (terminoBusqueda.trim()) {
      productos = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        producto.categoria.toLowerCase().includes(terminoBusqueda.toLowerCase())
      );
    }

    // Aplicar filtro por categoría
    if (categoriaSeleccionada && categoriaSeleccionada !== 'todas') {
      productos = productos.filter(producto => producto.categoria === categoriaSeleccionada);
    }

    // Aplicar ordenamiento
    productos.sort((a, b) => {
      let valorA, valorB;

      switch (ordenamiento) {
        case 'precio':
          // Convertir precio a número para ordenamiento
          valorA = parseFloat(a.precio.replace(/[$,]/g, ''));
          valorB = parseFloat(b.precio.replace(/[$,]/g, ''));
          break;
        case 'categoria':
          valorA = a.categoria.toLowerCase();
          valorB = b.categoria.toLowerCase();
          break;
        default: // 'nombre'
          valorA = a.nombre.toLowerCase();
          valorB = b.nombre.toLowerCase();
      }

      if (direccionOrden === 'desc') {
        return valorA < valorB ? 1 : valorA > valorB ? -1 : 0;
      }
      return valorA > valorB ? 1 : valorA < valorB ? -1 : 0;
    });

    return productos;
  }, [obtenerProductos, terminoBusqueda, categoriaSeleccionada, ordenamiento, direccionOrden]);

  // Función para limpiar todos los filtros
  const limpiarFiltros = () => {
    setTerminoBusqueda('');
    setCategoriaSeleccionada('todas');
    setOrdenamiento('nombre');
    setDireccionOrden('asc');
  };

  // Función para alternar dirección de ordenamiento
  const alternarOrdenamiento = (nuevoOrdenamiento) => {
    if (ordenamiento === nuevoOrdenamiento) {
      setDireccionOrden(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setOrdenamiento(nuevoOrdenamiento);
      setDireccionOrden('asc');
    }
  };

  // Estadísticas útiles
  const estadisticas = useMemo(() => ({
    totalProductos: obtenerProductos().length,
    productosFiltrados: productosFiltrados.length,
    categorias: obtenerCategorias(),
    hayFiltrosActivos: terminoBusqueda.trim() || categoriaSeleccionada !== 'todas'
  }), [obtenerProductos, obtenerCategorias, productosFiltrados.length, terminoBusqueda, categoriaSeleccionada]);

  return {
    // Productos filtrados
    productos: productosFiltrados,
    
    // Estados de filtros
    terminoBusqueda,
    categoriaSeleccionada,
    ordenamiento,
    direccionOrden,
    
    // Funciones para actualizar filtros
    setTerminoBusqueda,
    setCategoriaSeleccionada,
    setOrdenamiento,
    setDireccionOrden,
    alternarOrdenamiento,
    limpiarFiltros,
    
    // Estadísticas
    estadisticas
  };
};
