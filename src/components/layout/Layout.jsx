import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Badge, Box } from '@mui/material';
import { Home as HomeIcon, Favorite, Settings } from '@mui/icons-material';
import { useFavoritos } from '../../context/AppContext';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cantidadFavoritos } = useFavoritos();

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
            🛍️ Gestión de Productos
          </Typography>
          
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
