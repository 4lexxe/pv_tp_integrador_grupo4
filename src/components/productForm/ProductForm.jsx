import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Container,
  Grid,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Stack
} from '@mui/material';
import { ArrowBack, Save, Cancel, Add } from '@mui/icons-material';
import { useProductos } from '../../context/AppContext';

const ProductForm = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { obtenerProductoPorId, agregarProducto, actualizarProducto, obtenerCategorias } = useProductos();

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    imagen: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Categorías disponibles
  const categoriasExistentes = obtenerCategorias();
  const categoriasOpciones = [
    'Electrónicos',
    'Computadoras', 
    'Audio',
    'Periféricos',
    'Tablets',
    'Fotografía',
    'Accesorios',
    'Gaming'
  ];

  // Cargar producto para editar
  useEffect(() => {
    if (mode === 'edit' && id) {
      const producto = obtenerProductoPorId(parseInt(id));
      if (producto) {
        setFormData({
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio.replace('$', ''), // Remover $ para edición
          categoria: producto.categoria,
          imagen: producto.imagen
        });
      } else {
        navigate('/');
      }
    }
  }, [mode, id, obtenerProductoPorId, navigate]);

  // Manejar cambios en los campos
  const handleChange = (field) => (event) => {
    let value = event.target.value;
    
    // Manejo especial para el campo precio
    if (field === 'precio') {
      // Remover caracteres no numéricos excepto punto y coma
      value = value.replace(/[^0-9.,]/g, '');
      // Reemplazar comas por puntos para formato decimal
      value = value.replace(',', '.');
      // Limitar a 2 decimales
      const parts = value.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts[1];
      }
      if (parts[1] && parts[1].length > 2) {
        value = parts[0] + '.' + parts[1].substring(0, 2);
      }
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    } else if (formData.nombre.length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es obligatoria';
    } else if (formData.descripcion.length < 10) {
      newErrors.descripcion = 'La descripción debe tener al menos 10 caracteres';
    }

    if (!formData.precio.trim()) {
      newErrors.precio = 'El precio es obligatorio';
    } else {
      const precioNumerico = parseFloat(formData.precio);
      if (isNaN(precioNumerico) || precioNumerico <= 0) {
        newErrors.precio = 'El precio debe ser un número válido mayor a 0';
      } else if (precioNumerico > 999999.99) {
        newErrors.precio = 'El precio no puede ser mayor a $999,999.99';
      }
    }

    if (!formData.categoria) {
      newErrors.categoria = 'La categoría es obligatoria';
    }

    if (!formData.imagen.trim()) {
      newErrors.imagen = 'La URL de la imagen es obligatoria';
    } else if (!formData.imagen.match(/^https?:\/\/.+/)) {
      newErrors.imagen = 'Debe ser una URL válida (http:// o https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Agregar símbolo $ al precio antes de guardar
      const datosConPrecio = {
        ...formData,
        precio: `$${formData.precio}`
      };

      if (mode === 'create') {
        await agregarProducto(datosConPrecio);
        alert('Producto creado exitosamente');
      } else {
        await actualizarProducto(parseInt(id), datosConPrecio);
        alert('Producto actualizado exitosamente');
      }
      navigate('/');
    } catch (error) {
      alert('Error al guardar el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generar URL de imagen placeholder
  const generatePlaceholderImage = () => {
    const colors = ['1976d2', 'dc004e', '2e7d32', 'ff9800', '9c27b0', '795548'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const text = formData.nombre.replace(/\s+/g, '+') || 'Producto';
    return `https://via.placeholder.com/300x200/${randomColor}/ffffff?text=${text}`;
  };

  const handleGenerateImage = () => {
    setFormData(prev => ({ ...prev, imagen: generatePlaceholderImage() }));
  };

  // Formatear precio para mostrar
  const formatPrecioDisplay = (precio) => {
    if (!precio) return '';
    const numero = parseFloat(precio);
    if (isNaN(numero)) return precio;
    return numero.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
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

      {/* Formulario */}
      <Card>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Nombre */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre del Producto"
                  value={formData.nombre}
                  onChange={handleChange('nombre')}
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
                  onChange={handleChange('descripcion')}
                  error={!!errors.descripcion}
                  helperText={errors.descripcion || `${formData.descripcion.length} caracteres`}
                  placeholder="Describe las características principales del producto..."
                  required
                />
              </Grid>

              {/* Precio y Categoría */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Precio"
                  value={formData.precio}
                  onChange={handleChange('precio')}
                  error={!!errors.precio}
                  helperText={errors.precio || `Vista previa: $${formatPrecioDisplay(formData.precio)}`}
                  placeholder="999.99"
                  InputProps={{
                    startAdornment: (
                      <Typography variant="h6" sx={{ mr: 1, color: 'text.secondary' }}>
                        $
                      </Typography>
                    ),
                  }}
                  inputProps={{
                    inputMode: 'decimal',
                    pattern: '[0-9]*[.,]?[0-9]*'
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.categoria}>
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    value={formData.categoria}
                    onChange={handleChange('categoria')}
                    label="Categoría"
                    required
                  >
                    {categoriasOpciones.map((categoria) => (
                      <MenuItem key={categoria} value={categoria}>
                        {categoria}
                        {categoriasExistentes.includes(categoria) && (
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
                  onChange={handleChange('imagen')}
                  error={!!errors.imagen}
                  helperText={errors.imagen}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  required
                />
                <Box sx={{ mt: 1 }}>
                  <Button
                    size="small"
                    onClick={handleGenerateImage}
                    disabled={!formData.nombre.trim()}
                  >
                    Generar imagen placeholder
                  </Button>
                </Box>
              </Grid>

              {/* Preview de imagen */}
              {formData.imagen && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Vista previa:
                  </Typography>
                  <Card sx={{ maxWidth: 300 }}>
                    <img
                      src={formData.imagen}
                      alt="Vista previa"
                      style={{ width: '100%', height: 200, objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200/cccccc/666666?text=Error+al+cargar';
                      }}
                    />
                  </Card>
                </Grid>
              )}
            </Grid>

            {/* Botones de acción */}
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Save />}
                disabled={isSubmitting}
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
          </form>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          💡 <strong>Consejos:</strong> Solo ingresa números para el precio (ej: 999.99), 
          el símbolo $ se agregará automáticamente. Usa nombres descriptivos y URLs de imágenes válidas.
        </Typography>
      </Alert>
    </Container>
  );
};

export default ProductForm;
