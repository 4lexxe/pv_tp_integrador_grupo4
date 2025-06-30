// src/components/layout/Layout.jsx
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  Box,
  Chip,
  Container,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
  useMediaQuery
} from '@mui/material';
import {
  Home as HomeIcon,
  Favorite,
  Settings,
  Cloud,
  CloudOff,
  Tab,
  Info,
  Help,
  Menu as MenuIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

import { useFavoritos } from '../../context/FavoritosContext'; 
import { useAppSync } from '../../hooks/useAppSync.jsx';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();
  const location = useLocation();
  const { cantidadFavoritos } = useFavoritos();
  const { isOnline, tabsConnected, lastSync } = useAppSync();

  const { user, isAuthenticated, logout } = useAppContext();

  const isActive = (path) => location.pathname === path;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  const publicNavItems = [
    { text: 'Acerca de', icon: <Info />, path: '/acerca' },
    { text: 'Ayuda', icon: <Help />, path: '/ayuda' },
  ];

  const protectedNavItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/' },
    { text: 'Favoritos', icon: <Badge badgeContent={cantidadFavoritos()} color="error"><Favorite /></Badge>, path: '/favoritos' },
    { text: 'Configuración', icon: <Settings />, path: '/configuracion' },
  ];

  let displayedNavItems = [];

  if (isAuthenticated) {
    displayedNavItems = protectedNavItems;
  } else {
    displayedNavItems = publicNavItems;
    displayedNavItems.push(
      { text: 'Iniciar Sesión', icon: <LogoutIcon />, path: '/login' },
      { text: 'Registrarse', icon: <Info />, path: '/registro' }
    );
  }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            My React App
          </Typography>

          {isAuthenticated && (
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <Typography variant="body2" sx={{ mr: 1, display: { xs: 'none', sm: 'block' } }}>
                Bienvenido, {user?.name || user?.email}!
              </Typography>
              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Cerrar sesión
              </Button>
            </Box>
          )}

          <Chip
            icon={isOnline ? <Cloud /> : <CloudOff />}
            label={isOnline ? "Online" : "Offline"}
            size="small"
            color={isOnline ? "success" : "error"}
            sx={{ mr: 1 }}
          />
          <Chip
            label={`${tabsConnected} Pestaña(s)`}
            size="small"
            color="info"
          />

          {!isMobile && (
            <Box sx={{ ml: 2 }}>
              {displayedNavItems.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  onClick={() => handleNavigation(item.path)}
                  startIcon={item.icon}
                  sx={{
                    fontWeight: isActive(item.path) ? 'bold' : 'normal',
                    textDecoration: isActive(item.path) ? 'underline' : 'none',
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {isMobile && (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {displayedNavItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    selected={isActive(item.path)}
                    sx={{
                      borderRadius: 1,
                      mx: 0.5,
                      my: 0.2,
                      '&.Mui-selected': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.2),
                        }
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: isActive(item.path) ? theme.palette.primary.main : 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} primaryTypographyProps={{
                      fontWeight: isActive(item.path) ? 'bold' : 'normal'
                    }} />
                  </MenuItem>
                ))}
                {isAuthenticated && (
                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      borderRadius: 1,
                      mx: 0.5,
                      my: 0.2,
                      color: 'error.main',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.error.main, 0.1),
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: 'error.main' }}>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cerrar sesión" primaryTypographyProps={{
                      fontWeight: 'bold'
                    }} />
                  </MenuItem>
                )}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0
        }}
      >
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;