import React from 'react';
import { 
  Grid, 
  TextField, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip, 
  Box, 
  Button,
  Card
} from '@mui/material';
import OptimizedImage from '../common/OptimizedImage.jsx';

const FormFields = ({ formData, errors, onChange, onGenerateImage, categorias }) => {
  const formatPrecioDisplay = (precio) => {
    if (!precio) return '';
    const numero = parseFloat(precio);
    return isNaN(numero) ? precio : numero.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <Grid container spacing={3}>
      {/* Nombre */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Nombre del Producto"
          value={formData.nombre}
          onChange={(e) => onChange('nombre', e.target.value)}
          error={!!errors.nombre}
          helperText={errors.nombre}
          placeholder="Ej: iPhone 15 Pro Max"
          required
        />
      </Grid>

      {/* Descripción */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Descripción"
          value={formData.descripcion}
          onChange={(e) => onChange('descripcion', e.target.value)}
          error={!!errors.descripcion}
          helperText={errors.descripcion || `${formData.descripcion.length} caracteres`}
          placeholder="Describe las características principales del producto..."
          required
        />
      </Grid>

      {/* Precio */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Precio"
          value={formData.precio}
          onChange={(e) => onChange('precio', e.target.value)}
          error={!!errors.precio}
          helperText={errors.precio || `Vista previa: $${formatPrecioDisplay(formData.precio)}`}
          placeholder="999.99"
          InputProps={{
            startAdornment: (
              <Typography variant="h6" sx={{ mr: 1, color: 'text.secondary' }}>$</Typography>
            ),
          }}
          inputProps={{
            inputMode: 'decimal',
            pattern: '[0-9]*[.,]?[0-9]*'
          }}
          required
        />
      </Grid>

      {/* Categoría */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth error={!!errors.categoria}>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={formData.categoria}
            onChange={(e) => onChange('categoria', e.target.value)}
            label="Categoría"
            required
          >
            {categorias.opciones.map((categoria) => (
              <MenuItem key={categoria} value={categoria}>
                {categoria}
                {categorias.existentes.includes(categoria) && (
                  <Chip size="small" label="Existente" sx={{ ml: 1 }} />
                )}
              </MenuItem>
            ))}
          </Select>
          {errors.categoria && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
              {errors.categoria}
            </Typography>
          )}
        </FormControl>
      </Grid>

      {/* URL de Imagen */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="URL de la Imagen"
          value={formData.imagen}
          onChange={(e) => onChange('imagen', e.target.value)}
          error={!!errors.imagen}
          helperText={errors.imagen}
          placeholder="https://ejemplo.com/imagen.jpg"
          required
        />
        <Box sx={{ mt: 1 }}>
          <Button
            size="small"
            onClick={onGenerateImage}
            disabled={!formData.nombre.trim()}
          >
            Generar imagen placeholder
          </Button>
        </Box>
      </Grid>

      {/* Preview de imagen */}
      {formData.imagen && (
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Vista previa:</Typography>
          <Card sx={{ maxWidth: 300 }}>
            <OptimizedImage
              src={formData.imagen}
              alt="Vista previa"
              height={200}
              fallbackSrc="https://via.placeholder.com/300x200/cccccc/666666?text=Error+al+cargar"
            />
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default FormFields;
