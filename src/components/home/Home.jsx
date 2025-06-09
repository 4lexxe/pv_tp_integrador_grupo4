import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';

const Home = () => {
  const productos = [
    { id: 1, nombre: "Producto 1", descripcion: "Descripción del producto 1", precio: "$99.99" },
    { id: 2, nombre: "Producto 2", descripcion: "Descripción del producto 2", precio: "$149.99" },
    { id: 3, nombre: "Producto 3", descripcion: "Descripción del producto 3", precio: "$79.99" },
    { id: 4, nombre: "Producto 4", descripcion: "Descripción del producto 4", precio: "$199.99" },
    { id: 5, nombre: "Producto 5", descripcion: "Descripción del producto 5", precio: "$129.99" },
    { id: 6, nombre: "Producto 6", descripcion: "Descripción del producto 6", precio: "$89.99" }
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
        {productos.map(({ id, nombre, descripcion, precio }) => (
          <Card key={id} sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 }
          }}>
            <CardMedia
              component="img"
              height="200"
              image="https://via.placeholder.com/300x200"
              alt={nombre}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>{nombre}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {descripcion}
              </Typography>
              <Typography variant="h6" color="primary" fontWeight="bold">
                {precio}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Home;