import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, Checkbox, CardActions, Chip, Container } from '@mui/material';
import { Favorite, FavoriteBorder, Visibility, Add } from '@mui/icons-material';
import { useProductos, useFavoritos } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { toggleFavorito, esFavorito, cantidadFavoritos } = useFavoritos();
  const { obtenerProductos } = useProductos();
  const navigate = useNavigate();
  const productos = obtenerProductos();

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1">
          Catálogo de Productos
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {cantidadFavoritos() > 0 && (
            <Chip icon={<Favorite />} label={`${cantidadFavoritos()} favoritos`} color="error" />
          )}
          
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
      
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 3
      }}>
        {productos.map(({ id, nombre, descripcion, precio, categoria, imagen }) => (
          <Card key={id} sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 }
          }}>
            <Box sx={{ position: 'relative' }}>
              <CardMedia component="img" height="200" image={imagen} alt={nombre} />
              
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
                label={`#${id}`}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  color: 'white'
                }}
              />
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
                  {nombre}
                </Typography>
                <Chip label={categoria} size="small" color="primary" variant="outlined" />
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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
    </Container>
  );
};

export default Home;