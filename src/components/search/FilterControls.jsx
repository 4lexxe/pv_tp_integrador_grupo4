import React from 'react';
import { Box, IconButton, Divider, useTheme, alpha } from '@mui/material';
import { FilterList, Refresh } from '@mui/icons-material';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';

const FilterControls = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories = [],
  onRefresh,
  loading = false,
  searchPlaceholder = "Buscar productos...",
  showRefresh = true,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        p: 2, 
        mb: 4, 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        gap: 2,
        background: alpha(theme.palette.background.paper, 0.7),
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        border: '1px solid',
        borderColor: alpha(theme.palette.primary.main, 0.1),
        ...sx
      }}
    >
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        placeholder={searchPlaceholder}
      />
      
      <Divider 
        sx={{ 
          height: 28, 
          m: 0.5, 
          display: { xs: 'none', sm: 'block' } 
        }} 
        orientation="vertical" 
      />
      
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <FilterList sx={{ color: theme.palette.primary.main }} />
        
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          categories={categories}
        />
        
        {showRefresh && onRefresh && (
          <IconButton
            onClick={onRefresh}
            disabled={loading}
            title="Refrescar productos"
            color="primary"
            sx={{ 
              border: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.2),
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              }
            }}
          >
            <Refresh />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default FilterControls;
