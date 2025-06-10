import React, { createContext, useContext, useState } from 'react';

//----------------------------
// CONTEXT API PARA PRODUCTOS
//----------------------------

// Crear el contexto para productos
const ProductosContext = createContext();

/**
 * Hook personalizado para usar el contexto de productos
 * Valida que el hook se use dentro del ProductosProvider
 */
export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error('useProductos debe ser usado dentro de ProductosProvider');
  }
  return context;
};

/**
 * Provider del contexto de productos
 * Maneja el estado global de todos los productos de la aplicación
 */
export const ProductosProvider = ({ children }) => {
  //----------------------------
  // ESTADO LOCAL DEL CONTEXTO
  //----------------------------
  
  // Estado que contiene todos los productos de la aplicación
  const [productos, setProductos] = useState([
    { 
      id: 1, 
      nombre: "Smartphone Galaxy", 
      descripcion: "Teléfono inteligente con pantalla AMOLED de 6.1 pulgadas", 
      precio: "$899.99", 
      categoria: "Electrónicos",
      imagen: "https://via.placeholder.com/300x200/1976d2/ffffff?text=Smartphone"
    },
    { 
      id: 2, 
      nombre: "Laptop Gaming", 
      descripcion: "Laptop para gaming con RTX 4060 y 16GB RAM", 
      precio: "$1,499.99", 
      categoria: "Computadoras",
      imagen: "https://via.placeholder.com/300x200/dc004e/ffffff?text=Laptop"
    },
    { 
      id: 3, 
      nombre: "Auriculares Wireless", 
      descripcion: "Auriculares inalámbricos con cancelación de ruido", 
      precio: "$299.99", 
      categoria: "Audio",
      imagen: "https://via.placeholder.com/300x200/2e7d32/ffffff?text=Auriculares"
    },
    { 
      id: 4, 
      nombre: "Monitor 4K", 
      descripcion: "Monitor Ultra HD de 27 pulgadas para profesionales", 
      precio: "$649.99", 
      categoria: "Periféricos",
      imagen: "https://via.placeholder.com/300x200/ff9800/ffffff?text=Monitor"
    },
    { 
      id: 5, 
      nombre: "Tablet Pro", 
      descripcion: "Tablet profesional con stylus incluido y 256GB", 
      precio: "$799.99", 
      categoria: "Tablets",
      imagen: "https://via.placeholder.com/300x200/9c27b0/ffffff?text=Tablet"
    },
    { 
      id: 6, 
      nombre: "Cámara DSLR", 
      descripcion: "Cámara profesional de 24MP con lente 18-55mm", 
      precio: "$1,199.99", 
      categoria: "Fotografía",
      imagen: "https://via.placeholder.com/300x200/795548/ffffff?text=Cámara"
    }
  ]);

  // Estado para manejar el loading de productos
  const [loading, setLoading] = useState(false);

  //----------------------------
  // FUNCIONES DEL CONTEXTO
  //----------------------------

  // Obtiene todos los productos
  const obtenerProductos = () => productos;

  // Busca un producto por ID
  const obtenerProductoPorId = (id) => {
    return productos.find(producto => producto.id === id);
  };

  // Filtra productos por categoría
  const obtenerProductosPorCategoria = (categoria) => {
    return productos.filter(producto => producto.categoria === categoria);
  };

  // Obtiene todas las categorías únicas
  const obtenerCategorias = () => {
    return [...new Set(productos.map(producto => producto.categoria))];
  };

  // Busca productos por nombre (búsqueda)
  const buscarProductos = (termino) => {
    return productos.filter(producto => 
      producto.nombre.toLowerCase().includes(termino.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(termino.toLowerCase())
    );
  };

  // Agrega un nuevo producto (para futuras funcionalidades)
  const agregarProducto = (nuevoProducto) => {
    const id = Math.max(...productos.map(p => p.id)) + 1;
    setProductos(prev => [...prev, { ...nuevoProducto, id }]);
  };

  // Simula carga de productos desde API (para futuras funcionalidades)
  const cargarProductos = async () => {
    setLoading(true);
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  //----------------------------
  // VALOR DEL CONTEXTO
  //----------------------------
  
  // Objeto que se pasa a través del contexto
  const value = {
    // Estado
    productos,
    loading,
    
    // Funciones de consulta
    obtenerProductos,
    obtenerProductoPorId,
    obtenerProductosPorCategoria,
    obtenerCategorias,
    buscarProductos,
    
    // Funciones de modificación
    agregarProducto,
    cargarProductos
  };

  return (
    <ProductosContext.Provider value={value}>
      {children}
    </ProductosContext.Provider>
  );
};
