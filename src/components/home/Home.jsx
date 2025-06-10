import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Checkbox,
  CardActions,
  Chip
} from '@mui/material';
import { Favorite, FavoriteBorder, Visibility } from '@mui/icons-material';
import { useProductos, useFavoritos } from '../../context/AppContext';

/**
 * Componente Home - Página principal con grid de productos
 * Usando Context API
 */
const Home = () => {
  const { toggleFavorito, esFavorito } = useFavoritos();
  const { obtenerProductos } = useProductos();
  const productos = obtenerProductos();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
        Gestión de Productos
      </Typography>
      
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 3,
        maxWidth: 1200,
        margin: '0 auto'
      }}>
        {productos.map(({ id, nombre, descripcion, precio, categoria, imagen }) => (
          <Card key={id} sx={{ 
            display: 'flex',
            flexDirection: 'column',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 }
          }}>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="200"
                image={imagen}
                alt={nombre}
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
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  borderRadius: '50%'
                }}
              />
              <Chip
                label={`ID: ${id}`}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white'
                }}
              />
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
                  {nombre}
                </Typography>
                <Chip label={categoria} size="small" color="primary" />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {descripcion}
              </Typography>
              <Typography variant="h6" color="primary" fontWeight="bold">
                {precio}
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button
                variant="outlined"
                startIcon={<Visibility />}
                onClick={() => alert(`Ver detalles de: ${nombre} (ID: ${id})`)}
                fullWidth
              >
                Ver más detalles
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Home;