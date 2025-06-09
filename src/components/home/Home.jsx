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
import { useFavoritos } from '../../context/FavoritosContext';

const Home = () => {
  const { toggleFavorito, esFavorito } = useFavoritos();

  const productos = [
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