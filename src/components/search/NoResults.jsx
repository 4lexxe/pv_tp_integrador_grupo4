import React from 'react';
import { Card, Alert, Typography, Button, useTheme, alpha } from '@mui/material';
import { SearchOff, Clear } from '@mui/icons-material';

const NoResults = ({
  searchTerm,
  selectedCategory,
  onClearFilters,
  title = "No hay productos disponibles",
  sx = {}
}) => {
  const theme = useTheme();

  const hasFilters = searchTerm || selectedCategory;

  const getMessage = () => {
    if (hasFilters) {
      return 'No se encontraron productos con los filtros seleccionados.';
    }
    return 'Verifica tu conexión a internet o crea un producto local.';
  };

  return (
    <Card 
      sx={{ 
        textAlign: 'center', 
        py: 8, 
        backdropFilter: 'blur(10px)',
        ...sx
      }}
    >
      <Alert 
        severity="info" 
        sx={{ 
          maxWidth: 600, 
          mx: 'auto', 
          mb: 3, 
          backgroundColor: alpha(theme.palette.info.main, 0.1),
          border: '1px solid',
          borderColor: alpha(theme.palette.info.main, 0.2)
        }}
        icon={<SearchOff />}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {getMessage()}
        </Typography>
      </Alert>
      
      {hasFilters && onClearFilters && (
        <Button 
          variant="outlined" 
          startIcon={<Clear />}
          onClick={onClearFilters}
          sx={{
            borderColor: alpha(theme.palette.primary.main, 0.5),
            '&:hover': {
              borderColor: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            }
          }}
        >
          Limpiar filtros
        </Button>
      )}
    </Card>
  );
};

export default NoResults;
