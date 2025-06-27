import React from 'react';
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
  Rating,
  Grid,
  Badge,
  useTheme,
  alpha
} from '@mui/material';
import { 
  Favorite, 
  FavoriteBorder, 
  Visibility, 
  Add,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useProductos } from '../../context/ProductosContext';
import { useFavoritos } from '../../context/FavoritosContext';
import { useNavigate } from 'react-router-dom';
import { useProductFilter } from '../../hooks/useProductFilter';
import OptimizedImage from '../common/OptimizedImage.jsx';
import DashboardMetrics from '../dashboard/DashboardMetrics.jsx';
import { FilterControls, SearchResultsHeader, NoResults } from '../search';

const Home = () => {
  const theme = useTheme();
  const { toggleFavorito, esFavorito, cantidadFavoritos } = useFavoritos();
  const { obtenerProductos, obtenerCategorias, loading, error, refrescarProductos, obtenerEstadisticas } = useProductos();
  const navigate = useNavigate();
  
  const stats = obtenerEstadisticas();
  const categorias = obtenerCategorias();
  const allProducts = obtenerProductos();
  
  // Hook personalizado para filtrado
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    clearFilters,
    hasActiveFilters,
    resultsCount,
    totalCount
  } = useProductFilter(allProducts);

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

      {/* Controles de filtrado modulares */}
      <FilterControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categorias}
        onRefresh={handleRefresh}
        loading={loading}
        searchPlaceholder="Buscar productos..."
      />

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
      {!loading && filteredProducts.length > 0 && (
        <>
          <SearchResultsHeader
            selectedCategory={selectedCategory}
            resultsCount={resultsCount}
            totalCount={totalCount}
            searchTerm={searchTerm}
          />
          
          <Grid container spacing={3}>
            {filteredProducts.map(({ id, nombre, descripcion, precio, categoria, imagen, rating, esLocal }) => (
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
      {!loading && filteredProducts.length === 0 && (
        <NoResults
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onClearFilters={clearFilters}
          title={hasActiveFilters ? "No se encontraron productos" : "No hay productos disponibles"}
        />
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