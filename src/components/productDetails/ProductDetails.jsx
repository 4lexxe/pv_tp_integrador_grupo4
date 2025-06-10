import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Chip, 
  Container,
  Grid,
  Alert,
  IconButton
} from '@mui/material';
import { 
  Favorite, 
  FavoriteBorder, 
  ArrowBack, 
  Share,
  ShoppingCart,
  Edit
} from '@mui/icons-material';
import { useProductos, useFavoritos } from '../../context/AppContext';
import OptimizedImage from '../common/OptimizedImage.jsx';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { obtenerProductoPorId } = useProductos();
  const { toggleFavorito, esFavorito } = useFavoritos();

  const producto = obtenerProductoPorId(parseInt(id));

  if (!producto) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6">Producto no encontrado</Typography>
          <Typography variant="body2">
            El producto que buscas no existe o ha sido eliminado.
          </Typography>
        </Alert>
        <Button 
          variant="contained" 
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
        >
          Volver al catálogo
        </Button>
      </Container>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: producto.nombre,
        text: producto.descripcion,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('URL copiada al portapapeles');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Botón de regreso */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={() => navigate(`/editar-producto/${producto.id}`)}
        >
          Editar Producto
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Imagen del producto */}
        <Grid item xs={12} md={6}>
          <Card sx={{ position: 'relative' }}>
            <OptimizedImage
              src={producto.imagen}
              alt={producto.nombre}
              height={400}
            />
            
            {/* Badge de favorito */}
            <Chip
              icon={<Favorite />}
              label={esFavorito(producto.id) ? "En Favoritos" : "Agregar a Favoritos"}
              color={esFavorito(producto.id) ? "error" : "default"}
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                fontWeight: 'bold'
              }}
            />

            {/* ID del producto */}
            <Chip
              label={`ID: ${producto.id}`}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: 'rgba(0,0,0,0.8)',
                color: 'white'
              }}
            />
          </Card>
        </Grid>

        {/* Información del producto */}
        <Grid item xs={12} md={6}>
          <Box>
            {/* Header con título y acciones */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {producto.nombre}
                </Typography>
                <Chip 
                  label={producto.categoria} 
                  color="primary" 
                  size="large"
                  sx={{ mb: 2 }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton 
                  onClick={() => toggleFavorito(producto.id)}
                  color={esFavorito(producto.id) ? "error" : "default"}
                  size="large"
                  sx={{ 
                    border: '1px solid',
                    borderColor: esFavorito(producto.id) ? 'error.main' : 'grey.300'
                  }}
                >
                  {esFavorito(producto.id) ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <IconButton 
                  onClick={handleShare} 
                  size="large"
                  sx={{ border: '1px solid', borderColor: 'grey.300' }}
                >
                  <Share />
                </IconButton>
              </Box>
            </Box>

            {/* Precio destacado */}
            <Box sx={{ mb: 4, p: 3, backgroundColor: 'primary.main', borderRadius: 2, color: 'white' }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {producto.precio}
              </Typography>
              <Typography variant="body1">
                Precio final incluye todos los impuestos
              </Typography>
            </Box>

            {/* Descripción detallada */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Descripción del Producto
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                {producto.descripcion}
              </Typography>
            </Box>

            {/* Información del producto */}
            <Card sx={{ mb: 4, backgroundColor: 'grey.50' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Información del Producto
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      ID del Producto:
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      #{producto.id}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Categoría:
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {producto.categoria}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Nombre Completo:
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {producto.nombre}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Botones de acción */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                fullWidth
                onClick={() => alert('Funcionalidad de compra no implementada')}
                sx={{ py: 2 }}
              >
                Agregar al Carrito
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => alert('Funcionalidad de compra rápida no implementada')}
                sx={{ py: 2, minWidth: 120 }}
              >
                Comprar Ya
              </Button>
            </Box>

            {/* Estado de favorito */}
            <Alert 
              severity={esFavorito(producto.id) ? "success" : "info"} 
              sx={{ mt: 2 }}
            >
              <Typography variant="body2">
                {esFavorito(producto.id) 
                  ? "✓ Este producto está en tus favoritos" 
                  : "Haz clic en el corazón para agregar a favoritos"
                }
              </Typography>
            </Alert>
          </Box>
        </Grid>
      </Grid>

      {/* Información adicional simple */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h4" sx={{ mb: 1 }}>💰</Typography>
              <Typography variant="h6" gutterBottom>
                Mejor Precio
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Garantizamos el mejor precio del mercado
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h4" sx={{ mb: 1 }}>🚚</Typography>
              <Typography variant="h6" gutterBottom>
                Envío Gratis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A todo el país sin costo adicional
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h4" sx={{ mb: 1 }}>🛡️</Typography>
              <Typography variant="h6" gutterBottom>
                Garantía
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Garantía de satisfacción del cliente
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
