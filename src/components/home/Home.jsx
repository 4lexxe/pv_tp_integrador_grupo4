import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, Checkbox, CardActions, Chip, Container, Alert, CircularProgress, IconButton, Rating } from '@mui/material';
import { Favorite, FavoriteBorder, Visibility, Add, Refresh } from '@mui/icons-material';
import { useProductos, useFavoritos } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from '../common/OptimizedImage.jsx';

const Home = () => {
  const { toggleFavorito, esFavorito, cantidadFavoritos } = useFavoritos();
  const { obtenerProductos, loading, error, refrescarProductos, obtenerEstadisticas } = useProductos();
  const navigate = useNavigate();
  const productos = obtenerProductos();
  const stats = obtenerEstadisticas();

  const handleRefresh = async () => {
    try {
      await refrescarProductos();
    } catch (err) {
      console.error('Error al refrescar:', err);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h3" component="h1">
            Catálogo de Productos
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {stats.productosAPI} de API • {stats.productosLocales} locales • Total: {stats.totalProductos}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {cantidadFavoritos() > 0 && (
            <Chip icon={<Favorite />} label={`${cantidadFavoritos()} favoritos`} color="error" />
          )}
          
          {stats.needsUpdate && (
            <Chip 
              label="API desactualizada" 
              color="warning" 
              size="small"
            />
          )}
          
          <IconButton
            onClick={handleRefresh}
            disabled={loading}
            title="Refrescar productos"
          >
            <Refresh />
          </IconButton>
          
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/crear-producto')}
            size="large"
            sx={{ fontWeight: 'bold' }}
          >
            Crear Producto
          </Button>
        </Box>
      </Box>

      {/* Estado de error */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} action={
          <Button color="inherit" size="small" onClick={handleRefresh}>
            Reintentar
          </Button>
        }>
          {error}
        </Alert>
      )}

      {/* Estado de carga */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Cargando productos...
          </Typography>
        </Box>
      )}
      
      {/* Grid de productos */}
      {!loading && (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 3
        }}>
          {productos.map(({ id, nombre, descripcion, precio, categoria, imagen, rating, esLocal }) => (
            <Card key={id} sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 }
            }}>
              <Box sx={{ position: 'relative' }}>
                <OptimizedImage
                  src={imagen}
                  alt={nombre}
                  height={200}
                />
                
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={esFavorito(id)}
                  onChange={() => toggleFavorito(id)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'white',
                    '&.Mui-checked': { color: 'red' },
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    borderRadius: '50%'
                  }}
                />

                <Chip
                  label={esLocal ? `#${id} (Local)` : `#${id}`}
                  size="small"
                  color={esLocal ? 'secondary' : 'default'}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    backgroundColor: esLocal ? 'secondary.main' : 'rgba(0,0,0,0.8)',
                    color: 'white'
                  }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                  <Typography variant="h6" component="h2" sx={{ 
                    flexGrow: 1, 
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {nombre}
                  </Typography>
                  <Chip label={categoria} size="small" color="primary" variant="outlined" />
                </Box>

                {/* Rating de la API */}
                {rating && rating.rate > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Rating 
                      value={rating.rate} 
                      precision={0.1} 
                      size="small" 
                      readOnly 
                    />
                    <Typography variant="caption" color="text.secondary">
                      ({rating.count})
                    </Typography>
                  </Box>
                )}
                
                <Typography variant="body2" color="text.secondary" sx={{ 
                  mb: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {descripcion}
                </Typography>
                
                <Typography variant="h5" color="primary" fontWeight="bold">
                  {precio}
                </Typography>
              </CardContent>

              <CardActions sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Visibility />}
                  onClick={() => navigate(`/producto/${id}`)}
                  fullWidth
                >
                  Ver Detalles
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

      {/* Mensaje cuando no hay productos */}
      {!loading && productos.length === 0 && (
        <Alert severity="info" sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No hay productos disponibles
          </Typography>
          <Typography variant="body2">
            Verifica tu conexión a internet o crea un producto local.
          </Typography>
        </Alert>
      )}
    </Container>
  );
};

export default Home;