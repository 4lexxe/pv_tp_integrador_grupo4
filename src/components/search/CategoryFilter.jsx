import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CategoryFilter = ({ 
  selectedCategory, 
  onCategoryChange, 
  categories = [],
  label = "Categoría",
  placeholder = "Todas",
  sx = {}
}) => {
  return (
    <FormControl size="small" sx={{ minWidth: 150, ...sx }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={selectedCategory}
        label={label}
        onChange={(e) => onCategoryChange(e.target.value)}
        displayEmpty
      >
        <MenuItem value="">{placeholder}</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
