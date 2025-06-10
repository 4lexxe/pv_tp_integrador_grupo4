import React, { createContext, useContext, useState } from 'react';

const ProductosContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) throw new Error('useProductos debe usarse dentro de ProductosProvider');
  return context;
};

const productosIniciales = [
  { id: 1, nombre: "Smartphone Galaxy", descripcion: "Teléfono inteligente con pantalla AMOLED de 6.1 pulgadas", precio: "$899.99", categoria: "Electrónicos", imagen: "https://via.placeholder.com/300x200/1976d2/ffffff?text=Smartphone" },
  { id: 2, nombre: "Laptop Gaming", descripcion: "Laptop para gaming con RTX 4060 y 16GB RAM", precio: "$1,499.99", categoria: "Computadoras", imagen: "https://via.placeholder.com/300x200/dc004e/ffffff?text=Laptop" },
  { id: 3, nombre: "Auriculares Wireless", descripcion: "Auriculares inalámbricos con cancelación de ruido", precio: "$299.99", categoria: "Audio", imagen: "https://via.placeholder.com/300x200/2e7d32/ffffff?text=Auriculares" },
  { id: 4, nombre: "Monitor 4K", descripcion: "Monitor Ultra HD de 27 pulgadas para profesionales", precio: "$649.99", categoria: "Periféricos", imagen: "https://via.placeholder.com/300x200/ff9800/ffffff?text=Monitor" },
  { id: 5, nombre: "Tablet Pro", descripcion: "Tablet profesional con stylus incluido y 256GB", precio: "$799.99", categoria: "Tablets", imagen: "https://via.placeholder.com/300x200/9c27b0/ffffff?text=Tablet" },
  { id: 6, nombre: "Cámara DSLR", descripcion: "Cámara profesional de 24MP con lente 18-55mm", precio: "$1,199.99", categoria: "Fotografía", imagen: "https://via.placeholder.com/300x200/795548/ffffff?text=Cámara" }
];

export const ProductosProvider = ({ children }) => {
  const [productos] = useState(productosIniciales);
  const [loading, setLoading] = useState(false);

  const value = {
    productos,
    loading,
    obtenerProductos: () => productos,
    obtenerProductoPorId: (id) => productos.find(p => p.id === id),
    obtenerProductosPorCategoria: (categoria) => productos.filter(p => p.categoria === categoria),
    obtenerCategorias: () => [...new Set(productos.map(p => p.categoria))],
    buscarProductos: (termino) => productos.filter(p => 
      p.nombre.toLowerCase().includes(termino.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(termino.toLowerCase())
    ),
    cargarProductos: async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    }
  };

  return <ProductosContext.Provider value={value}>{children}</ProductosContext.Provider>;
};
