import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useCrossTabSync } from "../hooks/useCrossTabSync.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.jsx";
import { useApi } from "../hooks/useApi.jsx";
import productService from "../services/productService.jsx";

const ProductosContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context)
    throw new Error("useProductos debe usarse dentro de ProductosProvider");
  return context;
};

export const ProductosProvider = ({ children }) => {
  // Persistencia en localStorage para productos de API
  const [productosApiStorage, setProductosApiStorage] = useLocalStorage(
    "productos_api",
    []
  );
  const [productosLocalesStorage, setProductosLocalesStorage] = useLocalStorage(
    "productos_locales",
    []
  );
  const [categoriasStorage, setCateoriasStorage] = useLocalStorage(
    "categorias_api",
    []
  );

  // Estados locales
  const [productos, setProductos] = useState(productosApiStorage);
  const [productosLocales, setProductosLocales] = useState(
    productosLocalesStorage
  );
  const [categorias, setCategorias] = useState(categoriasStorage);
  const [lastApiUpdate, setLastApiUpdate] = useState(
    localStorage.getItem("last_api_update") || null
  );

  const { loading, error, execute } = useApi();

  // Sincronización entre pestañas
  const handleMessage = useCallback(
    (message) => {
      if (message.type === "PRODUCTOS_API_UPDATE") {
        setProductos(message.productos);
        setProductosApiStorage(message.productos);
      } else if (message.type === "PRODUCTOS_LOCALES_UPDATE") {
        setProductosLocales(message.productosLocales);
        setProductosLocalesStorage(message.productosLocales);
      } else if (message.type === "CATEGORIAS_UPDATE") {
        setCategorias(message.categorias);
        setCateoriasStorage(message.categorias);
      }
    },
    [setProductosApiStorage, setProductosLocalesStorage, setCateoriasStorage]
  );

  const { sendMessage } = useCrossTabSync("productos-sync", handleMessage);

  // Verificar si necesita actualizar API (cada 30 minutos)
  const needsApiUpdate = useCallback(() => {
    if (!lastApiUpdate) return true;
    const thirtyMinutes = 30 * 60 * 1000;
    return Date.now() - parseInt(lastApiUpdate) > thirtyMinutes;
  }, [lastApiUpdate]);

  // Cargar productos de la API al iniciar
  useEffect(() => {
    // Cargar desde localStorage primero
    if (productosApiStorage.length > 0 && !needsApiUpdate()) {
      setProductos(productosApiStorage);
      setCategorias(categoriasStorage);
    } else {
      // Cargar desde API si no hay datos o están desactualizados
      cargarProductosDeAPI();
      cargarCategorias();
    }
  }, []);

  // Notificar cambios a otras pestañas
  const notificarCambio = useCallback(
    (datos, tipo) => {
      sendMessage({
        type: tipo,
        ...datos,
        timestamp: Date.now(),
      });
    },
    [sendMessage]
  );

  // Cargar productos desde la API
  const cargarProductosDeAPI = useCallback(async () => {
    try {
      const productosAPI = await execute(() => productService.getAllProducts());

      // Actualizar estados locales
      setProductos(productosAPI);
      setProductosApiStorage(productosAPI);

      // Actualizar timestamp de última actualización
      const now = Date.now().toString();
      setLastApiUpdate(now);
      localStorage.setItem("last_api_update", now);

      // Notificar a otras pestañas
      notificarCambio({ productos: productosAPI }, "PRODUCTOS_API_UPDATE");

      return productosAPI;
    } catch (err) {
      console.error("Error cargando productos de la API:", err);
      // Si falla, usar datos del localStorage si existen
      if (productosApiStorage.length > 0) {
        setProductos(productosApiStorage);
        return productosApiStorage;
      }
      return [];
    }
  }, [execute, setProductosApiStorage, notificarCambio, productosApiStorage]);

  // Cargar categorías desde la API
  const cargarCategorias = useCallback(async () => {
    try {
      const categoriasAPI = await execute(() => productService.getCategories());

      setCategorias(categoriasAPI);
      setCateoriasStorage(categoriasAPI);
      notificarCambio({ categorias: categoriasAPI }, "CATEGORIAS_UPDATE");

      return categoriasAPI;
    } catch (err) {
      console.error("Error cargando categorías:", err);
      const fallbackCategorias = [
        "Electrónicos",
        "Ropa Masculina",
        "Ropa Femenina",
        "Joyería",
      ];
      setCategorias(fallbackCategorias);
      setCateoriasStorage(fallbackCategorias);
      return fallbackCategorias;
    }
  }, [execute, setCateoriasStorage, notificarCambio]);

  // Obtener todos los productos (API + locales)
  const obtenerProductos = useCallback(() => {
    return [...productos, ...productosLocales];
  }, [productos, productosLocales]);

  // Buscar producto por ID (API + locales)
  const obtenerProductoPorId = useCallback(
    (id) => {
      return obtenerProductos().find((p) => p.id === id);
    },
    [obtenerProductos]
  );

  // Filtrar por categoría
  const obtenerProductosPorCategoria = useCallback(
    (categoria) => {
      return obtenerProductos().filter((p) => p.categoria === categoria);
    },
    [obtenerProductos]
  );

  // Obtener categorías (API + locales)
  const obtenerCategorias = useCallback(() => {
    const categoriasLocales = [
      ...new Set(productosLocales.map((p) => p.categoria)),
    ];
    return [...new Set([...categorias, ...categoriasLocales])];
  }, [categorias, productosLocales]);

  // Buscar productos
  const buscarProductos = useCallback(
    (termino) => {
      return productService.searchProducts(obtenerProductos(), termino);
    },
    [obtenerProductos]
  );

  // Agregar producto local (no a la API)
  const agregarProducto = useCallback(
    async (nuevoProducto) => {
      try {
        const id =
          Math.max(
            ...obtenerProductos().map((p) => p.id),
            1000 // Empezar IDs locales desde 1000
          ) + 1;

        const productoConId = { ...nuevoProducto, id, esLocal: true };
        const nuevosLocales = [...productosLocales, productoConId];

        setProductosLocales(nuevosLocales);
        setProductosLocalesStorage(nuevosLocales);
        notificarCambio(
          { productosLocales: nuevosLocales },
          "PRODUCTOS_LOCALES_UPDATE"
        );

        return productoConId;
      } catch (error) {
        throw new Error("Error al agregar producto");
      }
    },
    [
      productosLocales,
      obtenerProductos,
      setProductosLocalesStorage,
      notificarCambio,
    ]
  );

  // Actualizar producto (solo locales)
  const actualizarProducto = useCallback(
    async (id, datosActualizados) => {
      try {
        // Solo permitir editar productos locales
        const productoExistente = productosLocales.find((p) => p.id === id);
        if (!productoExistente) {
          throw new Error("Solo se pueden editar productos creados localmente");
        }

        const nuevosLocales = productosLocales.map((p) =>
          p.id === id ? { ...p, ...datosActualizados } : p
        );

        setProductosLocales(nuevosLocales);
        setProductosLocalesStorage(nuevosLocales);
        notificarCambio(
          { productosLocales: nuevosLocales },
          "PRODUCTOS_LOCALES_UPDATE"
        );

        return nuevosLocales.find((p) => p.id === id);
      } catch (error) {
        throw error;
      }
    },
    [productosLocales, setProductosLocalesStorage, notificarCambio]
  );

  const eliminarProductosLocales = useCallback(async () => {
    try {
      if (productosLocales.length === 0) {
        throw new Error("No hay productos locales para eliminar");
      }

      setProductosLocales([]);
      setProductosLocalesStorage([]);
      notificarCambio({ productosLocales: [] }, "PRODUCTOS_LOCALES_UPDATE");

      return true;
    } catch (error) {
      throw error;
    }
  });

  // Eliminar producto (solo locales)
  const eliminarProducto = useCallback(
    async (id) => {
      try {
        const productoExistente = productosLocales.find((p) => p.id === id);
        if (!productoExistente) {
          throw new Error(
            "Solo se pueden eliminar productos creados localmente"
          );
        }

        const nuevosLocales = productosLocales.filter((p) => p.id !== id);
        setProductosLocales(nuevosLocales);
        setProductosLocalesStorage(nuevosLocales);
        notificarCambio(
          { productosLocales: nuevosLocales },
          "PRODUCTOS_LOCALES_UPDATE"
        );

        return true;
      } catch (error) {
        throw error;
      }
    },
    [productosLocales, setProductosLocalesStorage, notificarCambio]
  );

  // Refrescar productos de la API
  const refrescarProductos = useCallback(async () => {
    await cargarProductosDeAPI();
    await cargarCategorias();
  }, [cargarProductosDeAPI, cargarCategorias]);

  // Limpiar cache de API
  const limpiarCacheAPI = useCallback(() => {
    setProductos([]);
    setProductosApiStorage([]);
    setCategorias([]);
    setCateoriasStorage([]);
    localStorage.removeItem("last_api_update");
    setLastApiUpdate(null);
    notificarCambio({ productos: [] }, "PRODUCTOS_API_UPDATE");
    notificarCambio({ categorias: [] }, "CATEGORIAS_UPDATE");
  }, [setProductosApiStorage, setCateoriasStorage, notificarCambio]);

  // Obtener estadísticas
  const obtenerEstadisticas = useCallback(() => {
    return {
      totalProductos: obtenerProductos().length,
      productosAPI: productos.length,
      productosLocales: productosLocales.length,
      categorias: obtenerCategorias().length,
      lastApiUpdate: lastApiUpdate
        ? new Date(parseInt(lastApiUpdate)).toLocaleString()
        : "Nunca",
      needsUpdate: needsApiUpdate(),
    };
  }, [
    obtenerProductos,
    productos.length,
    productosLocales.length,
    obtenerCategorias,
    lastApiUpdate,
    needsApiUpdate,
  ]);

  const value = {
    // Productos combinados
    productos: obtenerProductos(),

    // Productos separados
    productosAPI: productos,
    productosLocales,

    // Estados
    loading,
    error,

    // Funciones principales
    obtenerProductos,
    obtenerProductoPorId,
    obtenerProductosPorCategoria,
    obtenerCategorias,
    buscarProductos,

    // CRUD productos locales
    agregarProducto,
    actualizarProducto,
    eliminarProducto,

    // API management
    cargarProductos: cargarProductosDeAPI,
    refrescarProductos,
    limpiarCacheAPI,
    eliminarProductosLocales,

    // Utilidades
    obtenerEstadisticas,
    needsApiUpdate: needsApiUpdate(),
  };

  return (
    <ProductosContext.Provider value={value}>
      {children}
    </ProductosContext.Provider>
  );
};
