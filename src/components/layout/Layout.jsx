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
  Menu as MenuIcon
} from '@mui/icons-material';
import { useFavoritos } from '../../context/AppContext';
import { useAppSync } from '../../hooks/useAppSync.jsx';

const Layout = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const navigate = useNavigate();
  const location = useLocation();
  const { cantidadFavoritos } = useFavoritos();
  const { isOnline, tabsConnected, lastSync } = useAppSync();

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

  const navItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/' },
    { text: 'Favoritos', icon: <Badge badgeContent={cantidadFavoritos()} color="error"><Favorite /></Badge>, path: '/favoritos' },
    { text: 'Configuración', icon: <Settings />, path: '/configuracion' },
    { divider: true },
    { text: 'Acerca de', icon: <Info />, path: '/acerca' },
    { text: 'Ayuda', icon: <Help />, path: '/ayuda' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backdropFilter: 'blur(10px)',
          backgroundColor: alpha(theme.palette.background.paper, 0.7),
          borderBottom: '1px solid',
          borderColor: alpha(theme.palette.primary.main, 0.1),
          boxShadow: `0 2px 10px ${alpha('#000', 0.2)}`,
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              flexGrow: 1,
              cursor: 'pointer',
              fontWeight: 'bold',
              color: theme.palette.primary.light,
              textShadow: '0 0 5px rgba(74, 144, 226, 0.3)',
              letterSpacing: '0.5px'
            }}
            onClick={() => navigate('/')}
          >
            🛍️ Sistema de Gestión de Productos
          </Typography>
          
          {/* Indicadores de estado */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, alignItems: 'center', mr: 2 }}>
            <Chip
              icon={isOnline ? <Cloud fontSize="small" /> : <CloudOff fontSize="small" />}
              label={isOnline ? 'Online' : 'Offline'}
              size="small"
              color={isOnline ? 'success' : 'error'}
              variant="outlined"
              sx={{ borderRadius: '20px' }}
            />
            <Chip
              icon={<Tab fontSize="small" />}
              label={`${tabsConnected} tab${tabsConnected > 1 ? 's' : ''}`}
              size="small"
              variant="outlined"
              sx={{ borderRadius: '20px' }}
            />
            
            {cantidadFavoritos() > 0 && (
              <Chip 
                icon={<Favorite fontSize="small" />} 
                label={cantidadFavoritos()} 
                color="error" 
                size="small" 
                onClick={() => navigate('/favoritos')}
                sx={{ 
                  cursor: 'pointer',
                  borderRadius: '20px',
                  boxShadow: '0 0 5px rgba(255, 23, 68, 0.3)',
                  '&:hover': {
                    boxShadow: '0 0 8px rgba(255, 23, 68, 0.5)',
                  }
                }}
              />
            )}
          </Box>
          
          {/* Navegación desktop */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navItems.filter(item => !item.divider).map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  startIcon={item.icon}
                  onClick={() => handleNavigation(item.path)}
                  variant={isActive(item.path) ? 'contained' : 'text'}
                  size="small"
                  sx={{ 
                    borderRadius: '20px',
                    px: 2,
                    ...(isActive(item.path) ? {
                      background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                      boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.5)}`,
                    } : { 
                      color: alpha(theme.palette.primary.light, 0.9)
                    }),
                    '&:hover': {
                      backgroundColor: isActive(item.path) 
                        ? alpha(theme.palette.primary.main, 0.9)
                        : alpha(theme.palette.primary.main, 0.1)
                    }
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          ) : (
            <Box>
              <IconButton 
                color="inherit" 
                onClick={handleMenuOpen}
                sx={{ 
                  color: theme.palette.primary.light,
                  border: '1px solid',
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{
                  '& .MuiPaper-root': {
                    backgroundColor: theme.palette.background.paper,
                    backgroundImage: 'none',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: alpha(theme.palette.primary.main, 0.1),
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                  }
                }}
              >
                {navItems.map((item, index) => (
                  item.divider ? (
                    <Box key={`divider-${index}`} sx={{ my: 1, borderBottom: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.1) }} />
                  ) : (
                    <MenuItem 
                      key={item.text}
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
                  )
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      {/* Contenido principal */}
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
