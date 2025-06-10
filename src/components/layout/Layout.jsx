import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Badge, Box, Chip } from '@mui/material';
import { Home as HomeIcon, Favorite, Settings, Cloud, CloudOff, Tab, Info, Help } from '@mui/icons-material';
import { useFavoritos } from '../../context/AppContext';
import { useAppSync } from '../../hooks/useAppSync.jsx';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cantidadFavoritos } = useFavoritos();
  const { isOnline, tabsConnected, lastSync } = useAppSync();

  const isActive = (path) => location.pathname === path;

  // Función para obtener el nombre de la página actual
  const getCurrentPageName = () => {
    if (location.pathname.startsWith('/producto/')) {
      return 'Detalle del Producto';
    }
    if (location.pathname.startsWith('/editar-producto/')) {
      return 'Editar Producto';
    }
    switch (location.pathname) {
      case '/':
        return 'Inicio';
      case '/favoritos':
        return 'Favoritos';
      case '/configuracion':
        return 'Configuración';
      case '/crear-producto':
        return 'Crear Producto';
      default:
        return 'Página';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
            🛍️ Gestión de Productos
          </Typography>
          
          {/* Indicadores de sincronización */}
          <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
            <Chip
              icon={isOnline ? <Cloud /> : <CloudOff />}
              label={isOnline ? 'Online' : 'Offline'}
              size="small"
              color={isOnline ? 'success' : 'error'}
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
            />
            <Chip
              icon={<Tab />}
              label={`${tabsConnected} tab${tabsConnected > 1 ? 's' : ''}`}
              size="small"
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              color="inherit" 
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              variant={isActive('/') ? 'outlined' : 'text'}
            >
              Inicio
            </Button>
            
            <Button 
              color="inherit" 
              startIcon={<Badge badgeContent={cantidadFavoritos()} color="error"><Favorite /></Badge>}
              onClick={() => navigate('/favoritos')}
              variant={isActive('/favoritos') ? 'outlined' : 'text'}
            >
              Favoritos
            </Button>

            <Button 
              color="inherit" 
              startIcon={<Settings />}
              onClick={() => navigate('/configuracion')}
              variant={isActive('/configuracion') ? 'outlined' : 'text'}
            >
              Config
            </Button>

            <Button 
              color="inherit" 
              startIcon={<Info />}
              onClick={() => navigate('/acerca')}
              variant={isActive('/acerca') ? 'outlined' : 'text'}
            >
              Acerca
            </Button>

            <Button 
              color="inherit" 
              startIcon={<Help />}
              onClick={() => navigate('/ayuda')}
              variant={isActive('/ayuda') ? 'outlined' : 'text'}
            >
              Ayuda
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
