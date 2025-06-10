import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, CardActions, Chip, Alert, Container } from '@mui/material';
import { Favorite, Visibility, Delete, ShoppingBag } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useProductos, useFavoritos } from '../../context/AppContext';
import OptimizedImage from '../common/OptimizedImage.jsx';

const Favoritos = () => {
  const { obtenerProductoPorId } = useProductos();
  const { obtenerFavoritos, toggleFavorito, cantidadFavoritos, limpiarFavoritos } = useFavoritos();
  const navigate = useNavigate();

  const favoritosIds = obtenerFavoritos();
  const productosFavoritos = favoritosIds.map(id => obtenerProductoPorId(id)).filter(Boolean);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1">
          💖 Mis Favoritos
        </Typography>
        <Chip icon={<Favorite />} label={`${cantidadFavoritos()} productos`} color="error" />
      </Box>

      {productosFavoritos.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <ShoppingBag sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Alert severity="info" sx={{ maxWidth: 600, margin: '0 auto', mb: 3 }}>
            <Typography variant="h6" gutterBottom>No tienes productos favoritos</Typography>
            <Typography variant="body2">
              Ve a la página principal y marca algunos productos como favoritos.
            </Typography>
          </Alert>
          <Button variant="contained" onClick={() => navigate('/')}>
            Explorar Productos
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => limpiarFavoritos()}>
              Limpiar Favoritos
            </Button>
          </Box>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: 3
          }}>
            {productosFavoritos.map((producto) => (
              <Card key={producto.id} sx={{ 
                display: 'flex',
                flexDirection: 'column',
                border: '2px solid',
                borderColor: 'error.main',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 }
              }}>
                <Box sx={{ position: 'relative' }}>
                  <OptimizedImage
                    src={producto.imagen}
                    alt={producto.nombre}
                    height={200}
                  />
                  
                  <Chip
                    icon={<Favorite />}
                    label="Favorito"
                    color="error"
                    size="small"
                    sx={{ position: 'absolute', top: 8, left: 8 }}
                  />

                  <Chip
                    label={`#${producto.id}`}
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      left: 8,
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      color: 'white'
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
                      {producto.nombre}
                    </Typography>
                    <Chip label={producto.categoria} size="small" color="primary" variant="outlined" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {producto.descripcion}
                  </Typography>
                  <Typography variant="h5" color="primary" fontWeight="bold">
                    {producto.precio}
                  </Typography>
                </CardContent>

                <CardActions sx={{ p: 2, gap: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={<Visibility />}
                    onClick={() => navigate(`/producto/${producto.id}`)}
                    fullWidth
                  >
                    Ver Detalles
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => toggleFavorito(producto.id)}
                    sx={{ minWidth: 'auto' }}
                  >
                    <Delete />
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Container>
  );
};

export default Favoritos;
