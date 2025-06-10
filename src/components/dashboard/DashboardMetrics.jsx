import React from 'react';
import { Grid, Paper, Typography, Box, CircularProgress, Chip, useTheme, alpha } from '@mui/material';
import { 
  TrendingUp, 
  TrendingDown, 
  ShoppingBag, 
  Favorite, 
  Storage, 
  Category
} from '@mui/icons-material';
import { useProductos, useFavoritos } from '../../context/AppContext';

const MetricCard = ({ title, value, icon, color, trend = null, subtitle = null }) => {
  const theme = useTheme();
  
  return (
    <Paper 
      sx={{ 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.7)} 0%, ${alpha(theme.palette.background.default, 0.7)} 100%)`,
        border: '1px solid',
        borderColor: alpha(theme.palette[color].main, 0.2),
        borderRadius: 3,
        boxShadow: `0 8px 16px rgba(0, 0, 0, 0.2), 0 0 10px ${alpha(theme.palette[color].main, 0.2)}`
      }}
    >
      {/* Decorative circle backgrounds */}
      <Box 
        sx={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette[color].main, 0.15)} 0%, transparent 70%)`,
          zIndex: 0
        }}
      />
      <Box 
        sx={{
          position: 'absolute',
          bottom: -20,
          left: -20,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette[color].main, 0.1)} 0%, transparent 70%)`,
          zIndex: 0
        }}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, position: 'relative', zIndex: 1 }}>
        <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>{title}</Typography>
        <Box 
          sx={{ 
            p: 1, 
            borderRadius: '50%', 
            background: `linear-gradient(135deg, ${theme.palette[color].main} 0%, ${theme.palette[color].dark} 100%)`,
            color: theme.palette[color].contrastText,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 8px ${alpha(theme.palette[color].main, 0.4)}`
          }}
        >
          {icon}
        </Box>
      </Box>
      
      <Typography 
        variant="h3" 
        sx={{ 
          mb: 1, 
          fontWeight: 'bold', 
          position: 'relative', 
          zIndex: 1,
          background: `linear-gradient(45deg, ${theme.palette[color].light}, ${theme.palette[color].main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: `0 2px 4px ${alpha(theme.palette[color].main, 0.3)}`,
          fontSize: { xs: '1.8rem', sm: '2.2rem' }
        }}
      >
        {value}
      </Typography>
      
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, position: 'relative', zIndex: 1 }}>
          {subtitle}
        </Typography>
      )}
      
      {trend !== null && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto', position: 'relative', zIndex: 1 }}>
          {trend > 0 ? (
            <Chip 
              icon={<TrendingUp fontSize="small" />} 
              label={`+${trend}%`} 
              size="small" 
              color="success" 
              sx={{
                background: alpha(theme.palette.success.main, 0.15),
                color: theme.palette.success.light,
                fontWeight: 'bold',
                borderRadius: 4
              }}
            />
          ) : (
            <Chip 
              icon={<TrendingDown fontSize="small" />} 
              label={`${trend}%`} 
              size="small" 
              color="error" 
              sx={{
                background: alpha(theme.palette.error.main, 0.15),
                color: theme.palette.error.light,
                fontWeight: 'bold',
                borderRadius: 4
              }}
            />
          )}
        </Box>
      )}
    </Paper>
  );
};

const DashboardMetrics = () => {
  const theme = useTheme();
  const { obtenerEstadisticas, loading } = useProductos();
  const { cantidadFavoritos } = useFavoritos();

  const stats = obtenerEstadisticas();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress sx={{ color: theme.palette.primary.main }}/>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard 
          title="Total Productos"
          value={stats.totalProductos}
          icon={<ShoppingBag />}
          color="primary"
          trend={15}
          subtitle="Productos disponibles"
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard 
          title="Favoritos"
          value={cantidadFavoritos()}
          icon={<Favorite />}
          color="error"
          subtitle="De máximo 50 permitidos"
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard 
          title="API Externa"
          value={stats.productosAPI}
          icon={<Storage />}
          color="info"
          subtitle={`Actualizado: ${stats.needsUpdate ? 'Necesita actualización' : 'Al día'}`}
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard 
          title="Categorías"
          value={stats.categorias}
          icon={<Category />}
          color="secondary"
          subtitle="En todos los productos"
        />
      </Grid>
    </Grid>
  );
};

export default DashboardMetrics;
