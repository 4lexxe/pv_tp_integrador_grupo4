import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FormHeader = ({ mode }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{ mb: 2 }}
      >
        Volver al catálogo
      </Button>
      
      <Typography variant="h3" component="h1" gutterBottom>
        {mode === 'create' ? '➕ Crear Nuevo Producto' : '✏️ Editar Producto'}
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary">
        {mode === 'create' 
          ? 'Completa todos los campos para agregar un nuevo producto'
          : 'Modifica los campos que desees actualizar'
        }
      </Typography>
    </Box>
  );
};

export default FormHeader;
