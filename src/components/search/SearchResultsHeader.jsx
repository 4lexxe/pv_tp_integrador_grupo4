import React from 'react';
import { Box, Typography, Chip, useTheme, alpha } from '@mui/material';
import { FilterList } from '@mui/icons-material';

const SearchResultsHeader = ({
  selectedCategory,
  resultsCount,
  totalCount,
  searchTerm,
  sx = {}
}) => {
  const theme = useTheme();

  const getDisplayText = () => {
    if (searchTerm && selectedCategory) {
      return `Búsqueda: "${searchTerm}" en ${selectedCategory}`;
    } else if (searchTerm) {
      return `Búsqueda: "${searchTerm}"`;
    } else if (selectedCategory) {
      return `Categoría: ${selectedCategory}`;
    } else {
      return 'Todos los productos';
    }
  };

  const getResultsText = () => {
    if (searchTerm || selectedCategory) {
      return `${resultsCount} de ${totalCount} productos`;
    } else {
      return `${resultsCount} productos`;
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1, 
        mb: 2,
        background: alpha(theme.palette.background.paper, 0.5),
        backdropFilter: 'blur(5px)',
        borderRadius: 2,
        p: 1.5,
        border: '1px solid',
        borderColor: alpha(theme.palette.primary.main, 0.1),
        ...sx
      }}
    >
      <FilterList fontSize="small" color="primary" />
      
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 500, 
          color: theme.palette.primary.light,
          flexGrow: 1
        }}
      >
        {getDisplayText()}
      </Typography>
      
      <Chip 
        label={getResultsText()}
        size="small" 
        color="primary"
        variant="outlined" 
      />
    </Box>
  );
};

export default SearchResultsHeader;
