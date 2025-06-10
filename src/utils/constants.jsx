//----------------------------
// CONSTANTES GLOBALES DE LA APLICACIÓN
//----------------------------

// Claves para localStorage
export const STORAGE_KEYS = {
  FAVORITOS: 'app_favoritos',
  PRODUCTOS: 'app_productos',
  CONFIGURACION: 'app_configuracion',
  CARRITO: 'app_carrito'
};

// Estados de la aplicación
export const APP_STATES = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  IDLE: 'idle'
};

// Categorías de productos
export const CATEGORIAS = {
  ELECTRONICOS: 'Electrónicos',
  COMPUTADORAS: 'Computadoras',
  AUDIO: 'Audio',
  PERIFERICOS: 'Periféricos',
  TABLETS: 'Tablets',
  FOTOGRAFIA: 'Fotografía'
};

// Configuración de la aplicación
export const APP_CONFIG = {
  MAX_FAVORITOS: 50,
  PRODUCTOS_POR_PAGINA: 12,
  TIEMPO_CACHE: 5 * 60 * 1000, // 5 minutos en ms
  VERSION_API: 'v1'
};

// Mensajes reutilizables
export const MENSAJES = {
  ERROR_FAVORITOS: 'Error al gestionar favoritos',
  ERROR_PRODUCTOS: 'Error al cargar productos',
  FAVORITO_AGREGADO: 'Producto agregado a favoritos',
  FAVORITO_REMOVIDO: 'Producto removido de favoritos',
  SIN_PRODUCTOS: 'No se encontraron productos',
  CARGANDO: 'Cargando...'
};