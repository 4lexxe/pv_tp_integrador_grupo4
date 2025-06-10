import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Checkbox, 
  CardActions, 
  Chip, 
  Alert, 
  CircularProgress, 
  IconButton, 
  Rating,
  Grid,
  Paper,
  InputBase,
  Divider,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Badge,
  useTheme,
  alpha
} from '@mui/material';
import { 
  Favorite, 
  FavoriteBorder, 
  Visibility, 
  Add, 
  Refresh, 
  Search,
  FilterList,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useProductos, useFavoritos } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from '../common/OptimizedImage.jsx';
import DashboardMetrics from '../dashboard/DashboardMetrics.jsx';

const Home = () => {
  const theme = useTheme();
  const { toggleFavorito, esFavorito, cantidadFavoritos } = useFavoritos();
  const { obtenerProductos, obtenerCategorias, loading, error, refrescarProductos, obtenerEstadisticas } = useProductos();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const stats = obtenerEstadisticas();
  const categorias = obtenerCategorias();
  
  // Filtrar productos según búsqueda y categoría
  const productos = obtenerProductos().filter(producto => {
    // Filtro por categoría
    if (selectedCategory && producto.categoria !== selectedCategory) {
      return false;
    }
    
    // Filtro por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        producto.nombre.toLowerCase().includes(term) ||
        producto.descripcion.toLowerCase().includes(term) ||
        producto.categoria.toLowerCase().includes(term)
      );
    }
    
    return true;
  });

  const handleRefresh = async () => {
    try {
      await refrescarProductos();
    } catch (err) {
      console.error('Error al refrescar:', err);
    }
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Header section con estadísticas */}
      <Card 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.8)} 0%, ${alpha(theme.palette.primary.main, 0.4)} 100%)`,
          backdropFilter: 'blur(8px)',
          border: '1px solid',
          borderColor: alpha(theme.palette.primary.main, 0.2),
          overflow: 'visible',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(ellipse at top right, ${alpha(theme.palette.primary.light, 0.15)}, transparent 70%)`,
            borderRadius: 'inherit',
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', gap: 2 }}>
            <Box>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.8rem', sm: '2.5rem' },
                  color: 'white',
                  mb: 1,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}
              >
                <DashboardIcon sx={{ mr: 1, verticalAlign: 'top', fontSize: 'inherit' }} />
                Dashboard de Productos
              </Typography>
              <Typography variant="body1" color="rgba(255,255,255,0.9)">
                {stats.productosAPI} de API • {stats.productosLocales} locales • Total: {stats.totalProductos}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              {cantidadFavoritos() > 0 && (
                <Badge badgeContent={cantidadFavoritos()} color="error">
                  <Button 
                    variant="outlined" 
                    startIcon={<Favorite />} 
                    onClick={() => navigate('/favoritos')}
                    sx={{ 
                      borderColor: 'rgba(255,255,255,0.3)',
                      color: 'white',
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(5px)',
                      '&:hover': {
                        borderColor: 'white',
                        background: 'rgba(255,255,255,0.2)',
                      }
                    }}
                  >
                    Favoritos
                  </Button>
                </Badge>
              )}
              
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate('/crear-producto')}
                sx={{ 
                  fontWeight: 600, 
                  background: `linear-gradient(45deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                  boxShadow: '0 4px 12px rgba(0, 229, 255, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 14px rgba(0, 229, 255, 0.4)',
                  }
                }}
              >
                Crear Producto
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>

      {/* Dashboard Metrics */}
      <DashboardMetrics />

      {/* Barra de filtros y búsqueda */}
      <Card sx={{ p: 2, mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          backgroundColor: alpha(theme.palette.background.default, 0.5), 
          borderRadius: 1, 
          flex: 1,
          border: '1px solid',
          borderColor: alpha(theme.palette.primary.main, 0.1),
        }}>
          <IconButton sx={{ p: '10px' }} aria-label="search">
            <Search />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscar productos..."
            inputProps={{ 'aria-label': 'buscar productos' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <IconButton sx={{ p: '10px' }} aria-label="clear" onClick={() => setSearchTerm('')}>
              &times;
            </IconButton>
          )}
        </Box>
        
        <Divider sx={{ height: 28, m: 0.5, display: { xs: 'none', sm: 'block' } }} orientation="vertical" />
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FilterList sx={{ color: theme.palette.primary.main }} />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Categoría</InputLabel>
            <Select
              value={selectedCategory}
              label="Categoría"
              onChange={(e) => setSelectedCategory(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">Todas</MenuItem>
              {categorias.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <IconButton
            onClick={handleRefresh}
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
        </Box>
      </Card>

      {/* Estado de error */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} action={
          <Button color="inherit" size="small" onClick={handleRefresh}>
            Reintentar
          </Button>
        }>
          {error}
        </Alert>
      )}

      {/* Estado de carga */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Cargando productos...
          </Typography>
        </Box>
      )}
      
      {/* Grid de productos */}
      {!loading && productos.length > 0 && (
        <>
          <Box sx={{ 
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
          }}>
            <FilterList fontSize="small" color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 500, color: theme.palette.primary.light }}>
              {selectedCategory ? `Categoría: ${selectedCategory}` : 'Todos los productos'} 
            </Typography>
            <Chip 
              label={`${productos.length} productos`} 
              size="small" 
              color="primary"
              sx={{ ml: 1 }} 
              variant="outlined" 
            />
          </Box>
          
          <Grid container spacing={3}>
            {productos.map(({ id, nombre, descripcion, precio, categoria, imagen, rating, esLocal }) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                <Card sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { 
                    transform: 'translateY(-8px)', 
                    boxShadow: `0 12px 24px rgba(0, 0, 0, 0.4), 0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`
                  },
                  position: 'relative',
                  overflow: 'visible',
                  border: '1px solid',
                  borderColor: alpha(esLocal ? theme.palette.secondary.main : theme.palette.primary.main, 0.1),
                }}>
                  {/* Indicador de local */}
                  {esLocal && (
                    <Chip
                      label="Local"
                      size="small"
                      color="secondary"
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: 20,
                        zIndex: 1,
                        boxShadow: '0 2px 8px rgba(0, 229, 255, 0.4)'
                      }}
                    />
                  )}
                  
                  <Box sx={{ position: 'relative' }}>
                    <OptimizedImage
                      src={imagen}
                      alt={nombre}
                      height={180}
                      sx={{ borderBottom: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.1) }}
                    />
                    
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      checked={esFavorito(id)}
                      onChange={() => toggleFavorito(id)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'white',
                        '&.Mui-checked': { color: theme.palette.error.main },
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          transform: 'scale(1.1)',
                        },
                        transition: 'transform 0.2s',
                      }}
                    />

                    <Chip
                      label={`#${id}`}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: alpha(theme.palette.background.paper, 0.7),
                        backdropFilter: 'blur(5px)',
                        color: theme.palette.primary.light,
                        fontWeight: 'bold',
                        border: '1px solid',
                        borderColor: alpha(theme.palette.primary.main, 0.2),
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, paddingBottom: 1 }}>
                    <Chip 
                      label={categoria} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                      sx={{ mb: 1, fontWeight: 500 }} 
                    />
                    
                    <Typography 
                      variant="h6" 
                      component="h2" 
                      sx={{ 
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        minHeight: '2.5rem',
                        color: theme.palette.primary.light
                      }}
                    >
                      {nombre}
                    </Typography>

                    {/* Rating de la API */}
                    {rating && rating.rate > 0 && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Rating 
                          value={rating.rate} 
                          precision={0.1} 
                          size="small" 
                          readOnly 
                          sx={{
                            '& .MuiRating-icon': {
                              color: theme.palette.secondary.light
                            }
                          }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          ({rating.count})
                        </Typography>
                      </Box>
                    )}
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {descripcion}
                    </Typography>
                    
                    <Typography 
                      variant="h5" 
                      fontWeight="bold" 
                      sx={{ 
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block'
                      }}
                    >
                      {precio}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      startIcon={<Visibility />}
                      onClick={() => navigate(`/producto/${id}`)}
                      fullWidth
                      sx={{ 
                        fontWeight: 500,
                        background: esLocal 
                          ? `linear-gradient(45deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`
                          : `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                      }}
                    >
                      Ver Detalles
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Mensaje cuando no hay productos */}
      {!loading && productos.length === 0 && (
        <Card sx={{ textAlign: 'center', py: 8, backdropFilter: 'blur(10px)' }}>
          <Alert severity="info" sx={{ maxWidth: 600, mx: 'auto', mb: 3, backgroundColor: alpha(theme.palette.info.main, 0.1) }}>
            <Typography variant="h6" gutterBottom>
              No hay productos disponibles
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {searchTerm || selectedCategory ? 
                'No se encontraron productos con los filtros seleccionados.' : 
                'Verifica tu conexión a internet o crea un producto local.'}
            </Typography>
          </Alert>
          
          {(searchTerm || selectedCategory) && (
            <Button 
              variant="outlined" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
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
      )}
      
      {/* Estadísticas en footer */}
      <Card 
        sx={{ 
          mt: 4, 
          p: 2,
          display: 'flex', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          borderTop: '1px solid',
          borderColor: alpha(theme.palette.primary.main, 0.1),
          backdropFilter: 'blur(5px)',
          background: alpha(theme.palette.background.paper, 0.5),
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Última actualización: {stats.lastApiUpdate}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          {stats.needsUpdate && (
            <Chip 
              label="API desactualizada" 
              color="warning" 
              size="small"
              onClick={handleRefresh}
              sx={{ borderRadius: 4 }}
            />
          )}
          
          <Chip 
            label={`API: ${stats.productosAPI} productos`} 
            size="small" 
            color="info" 
            variant="outlined" 
            sx={{ borderRadius: 4 }}
          />
          
          <Chip 
            label={`Locales: ${stats.productosLocales}`} 
            size="small" 
            color="secondary" 
            variant="outlined" 
            sx={{ borderRadius: 4 }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default Home;