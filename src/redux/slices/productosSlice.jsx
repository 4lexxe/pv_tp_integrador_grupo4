import { createSlice } from '@reduxjs/toolkit';

//----------------------------
// SLICE DE PRODUCTOS
//----------------------------

const productosIniciales = [
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
];

const initialState = {
  productos: productosIniciales,
  loading: false,
  error: null,
  filtros: {
    categoria: 'todas',
    busqueda: '',
    ordenamiento: 'nombre'
  }
};

const productosSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: {
    // Establecer loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Establecer productos
    setProductos: (state, action) => {
      state.productos = action.payload;
      state.loading = false;
    },

    // Agregar nuevo producto
    agregarProducto: (state, action) => {
      const nuevoId = Math.max(...state.productos.map(p => p.id)) + 1;
      state.productos.push({ ...action.payload, id: nuevoId });
    },

    // Actualizar producto existente
    actualizarProducto: (state, action) => {
      const index = state.productos.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.productos[index] = action.payload;
      }
    },

    // Eliminar producto
    eliminarProducto: (state, action) => {
      state.productos = state.productos.filter(p => p.id !== action.payload);
    },

    // Establecer filtros
    setFiltros: (state, action) => {
      state.filtros = { ...state.filtros, ...action.payload };
    },

    // Limpiar filtros
    limpiarFiltros: (state) => {
      state.filtros = {
        categoria: 'todas',
        busqueda: '',
        ordenamiento: 'nombre'
      };
    },

    // Establecer error
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

// Selectores
export const selectProductos = (state) => state.productos.productos;
export const selectProductosLoading = (state) => state.productos.loading;
export const selectProductosError = (state) => state.productos.error;
export const selectFiltros = (state) => state.productos.filtros;

// Selector para productos filtrados
export const selectProductosFiltrados = (state) => {
  const productos = selectProductos(state);
  const filtros = selectFiltros(state);
  
  let productosFiltrados = [...productos];

  // Filtrar por categoría
  if (filtros.categoria && filtros.categoria !== 'todas') {
    productosFiltrados = productosFiltrados.filter(p => p.categoria === filtros.categoria);
  }

  // Filtrar por búsqueda
  if (filtros.busqueda) {
    productosFiltrados = productosFiltrados.filter(p =>
      p.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(filtros.busqueda.toLowerCase())
    );
  }

  // Ordenar
  productosFiltrados.sort((a, b) => {
    switch (filtros.ordenamiento) {
      case 'precio':
        return parseFloat(a.precio.replace(/[$,]/g, '')) - parseFloat(b.precio.replace(/[$,]/g, ''));
      case 'categoria':
        return a.categoria.localeCompare(b.categoria);
      default:
        return a.nombre.localeCompare(b.nombre);
    }
  });

  return productosFiltrados;
};

export const {
  setLoading,
  setProductos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
  setFiltros,
  limpiarFiltros,
  setError
} = productosSlice.actions;

export default productosSlice.reducer;
