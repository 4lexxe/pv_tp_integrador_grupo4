import apiClient from '../config/api.jsx';

class ProductService {
  // Obtener todos los productos
  async getAllProducts() {
    try {
      const response = await apiClient.get('/products');
      return this.transformProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('No se pudieron cargar los productos');
    }
  }

  // Obtener producto por ID
  async getProductById(id) {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return this.transformProduct(response.data);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw new Error('No se pudo cargar el producto');
    }
  }

  // Obtener productos por categoría
  async getProductsByCategory(category) {
    try {
      const response = await apiClient.get(`/products/category/${category}`);
      return this.transformProducts(response.data);
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw new Error('No se pudieron cargar los productos de la categoría');
    }
  }

  // Obtener todas las categorías
  async getCategories() {
    try {
      const response = await apiClient.get('/products/categories');
      return response.data.map(cat => this.capitalizeCategory(cat));
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('No se pudieron cargar las categorías');
    }
  }

  // Obtener productos con límite
  async getProductsWithLimit(limit = 20) {
    try {
      const response = await apiClient.get(`/products?limit=${limit}`);
      return this.transformProducts(response.data);
    } catch (error) {
      console.error('Error fetching limited products:', error);
      throw new Error('No se pudieron cargar los productos');
    }
  }

  // Transformar productos de la API al formato interno
  transformProducts(apiProducts) {
    return apiProducts.map(product => this.transformProduct(product));
  }

  // Transformar un solo producto
  transformProduct(apiProduct) {
    return {
      id: apiProduct.id,
      nombre: apiProduct.title,
      descripcion: apiProduct.description,
      precio: `$${apiProduct.price.toFixed(2)}`,
      categoria: this.capitalizeCategory(apiProduct.category),
      imagen: apiProduct.image,
      rating: apiProduct.rating,
      // Datos adicionales de la API
      originalData: {
        price: apiProduct.price,
        category: apiProduct.category,
        rating: apiProduct.rating
      }
    };
  }

  // Capitalizar categorías para consistencia
  capitalizeCategory(category) {
    const categoryMap = {
      "men's clothing": "Ropa Masculina",
      "women's clothing": "Ropa Femenina", 
      "jewelery": "Joyería",
      "electronics": "Electrónicos"
    };
    
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
  }

  // Buscar productos (simulado localmente)
  searchProducts(products, searchTerm) {
    if (!searchTerm) return products;
    
    const term = searchTerm.toLowerCase();
    return products.filter(product =>
      product.nombre.toLowerCase().includes(term) ||
      product.descripcion.toLowerCase().includes(term) ||
      product.categoria.toLowerCase().includes(term)
    );
  }
}

export default new ProductService();
