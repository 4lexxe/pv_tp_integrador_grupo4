import React from 'react';
import { Box, IconButton, InputBase, useTheme, alpha } from '@mui/material';
import { Search, Close } from '@mui/icons-material';

const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Buscar productos...", 
  sx = {} 
}) => {
  const theme = useTheme();

  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        backgroundColor: alpha(theme.palette.background.default, 0.5), 
        borderRadius: 1, 
        flex: 1,
        border: '1px solid',
        borderColor: alpha(theme.palette.primary.main, 0.1),
        transition: 'border-color 0.2s ease',
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, 0.3),
        },
        '&:focus-within': {
          borderColor: theme.palette.primary.main,
          boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
        },
        ...sx
      }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="search">
        <Search />
      </IconButton>
      
      <InputBase
        sx={{ 
          ml: 1, 
          flex: 1,
          '& .MuiInputBase-input': {
            padding: '8px 0',
          }
        }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'buscar productos' }}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      
      {searchTerm && (
        <IconButton 
          sx={{ p: '10px' }} 
          aria-label="clear" 
          onClick={handleClear}
          color="primary"
        >
          <Close />
        </IconButton>
      )}
    </Box>
  );
};

export default SearchBar;
