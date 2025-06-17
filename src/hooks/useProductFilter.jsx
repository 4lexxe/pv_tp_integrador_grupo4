import { useState, useMemo } from 'react';

export const useProductFilter = (productos = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filtrar productos según búsqueda y categoría
  const filteredProducts = useMemo(() => {
    return productos.filter(producto => {
      // Filtro por categoría
      if (selectedCategory && producto.categoria !== selectedCategory) {
        return false;
      }
      
      // Filtro por término de búsqueda
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          producto.nombre.toLowerCase().includes(term) ||
          producto.descripcion.toLowerCase().includes(term) ||
          producto.categoria.toLowerCase().includes(term)
        );
      }
      
      return true;
    });
  }, [productos, searchTerm, selectedCategory]);

  // Limpiar todos los filtros
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  // Verificar si hay filtros activos
  const hasActiveFilters = searchTerm || selectedCategory;

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    clearFilters,
    hasActiveFilters,
    resultsCount: filteredProducts.length,
    totalCount: productos.length
  };
};
