import React from 'react';
import { Box, Typography, Button, Container, Card, CardContent } from '@mui/material';
import { Home, ArrowBack, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Card sx={{ textAlign: 'center', p: 4 }}>
        <CardContent>
          <Typography variant="h1" sx={{ fontSize: '8rem', fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
            404
          </Typography>
          
          <Typography variant="h4" gutterBottom>
            Página no encontrada
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Lo sentimos, la página que buscas no existe. Es posible que haya sido movida, 
            eliminada o que hayas escrito incorrectamente la URL.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<Home />}
              onClick={() => navigate('/')}
              size="large"
            >
              Ir al Inicio
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              size="large"
            >
              Volver Atrás
            </Button>
          </Box>

          <Box sx={{ mt: 4, p: 3, backgroundColor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              ¿Qué puedes hacer?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'left' }}>
              <Typography variant="body2">• Verificar que la URL esté escrita correctamente</Typography>
              <Typography variant="body2">• Usar la navegación principal para encontrar lo que buscas</Typography>
              <Typography variant="body2">• Ir a la página de inicio y explorar el catálogo</Typography>
              <Typography variant="body2">• Buscar productos específicos desde el menú principal</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NotFound;
