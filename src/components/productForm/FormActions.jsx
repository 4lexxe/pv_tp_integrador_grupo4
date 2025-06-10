import React from 'react';
import { Stack, Button } from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FormActions = ({ mode, isSubmitting, onSubmit }) => {
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
      <Button
        type="submit"
        variant="contained"
        size="large"
        startIcon={<Save />}
        disabled={isSubmitting}
        onClick={onSubmit}
        sx={{ minWidth: 150 }}
      >
        {isSubmitting 
          ? 'Guardando...' 
          : mode === 'create' 
            ? 'Crear Producto' 
            : 'Actualizar Producto'
        }
      </Button>
      
      <Button
        variant="outlined"
        size="large"
        startIcon={<Cancel />}
        onClick={() => navigate('/')}
        disabled={isSubmitting}
      >
        Cancelar
      </Button>
    </Stack>
  );
};

export default FormActions;
