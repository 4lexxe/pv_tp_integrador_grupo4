import axios from 'axios';

// Configuración base de axios
const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para requests
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.status, error.message);
    
    // Manejo de errores específicos
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout: La petición tardó demasiado');
    } else if (!error.response) {
      console.error('Error de red: No se pudo conectar con la API');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;