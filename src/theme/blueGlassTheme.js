import { createTheme } from '@mui/material/styles';

// Tema cristalino azul con degradados
const blueGlassTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4dabf5', // Azul cristalino más claro
      light: '#80d8ff',
      dark: '#2979ff',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00e5ff', // Cian para elementos secundarios
      light: '#6effff',
      dark: '#00b2cc',
    },
    error: {
      main: '#ff1744',
    },
    warning: {
      main: '#ffab40',
    },
    info: {
      main: '#29b6f6',
    },
    success: {
      main: '#00e676',
    },
    background: {
      default: '#051124', // Azul muy oscuro casi negro
      paper: '#0a1929', // Azul oscuro para tarjetas
    },
    text: {
      primary: '#e3f2fd',
      secondary: '#90caf9',
    },
    divider: 'rgba(74, 144, 226, 0.2)',
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #051124 0%, #0a1929 100%)',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiCard: { 
      styleOverrides: { 
        root: { 
          borderRadius: 12, 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(74, 144, 226, 0.1)',
          background: 'linear-gradient(145deg, rgba(10, 25, 41, 0.9) 0%, rgba(5, 17, 36, 0.9) 100%)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden'
        } 
      } 
    },
    MuiButton: { 
      styleOverrides: { 
        root: { 
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        },
        contained: {
          background: 'linear-gradient(45deg, #4dabf5 0%, #2979ff 100%)',
        },
        outlined: {
          borderColor: 'rgba(74, 144, 226, 0.5)',
          '&:hover': {
            borderColor: '#4dabf5',
            boxShadow: '0 0 8px rgba(74, 144, 226, 0.6)',
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(10, 25, 41, 0.9)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          borderBottom: '1px solid rgba(74, 144, 226, 0.1)',
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(10, 25, 41, 0.95)',
          borderRight: '1px solid rgba(74, 144, 226, 0.1)',
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        },
        elevation3: {
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.5)',
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(74, 144, 226, 0.15)',
            '&:hover': {
              backgroundColor: 'rgba(74, 144, 226, 0.25)',
            }
          },
          '&:hover': {
            backgroundColor: 'rgba(74, 144, 226, 0.1)',
          }
        }
      }
    }
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    'none',
    '0 2px 10px rgba(0, 0, 0, 0.3)',
    '0 4px 12px rgba(0, 0, 0, 0.4)',
    '0 6px 16px rgba(0, 0, 0, 0.5)',
    '0 8px 20px rgba(0, 0, 0, 0.5)',
    '0 10px 24px rgba(0, 0, 0, 0.6)',
    '0 12px 28px rgba(0, 0, 0, 0.6)',
    '0 14px 32px rgba(0, 0, 0, 0.7)',
    '0 16px 36px rgba(0, 0, 0, 0.7)',
    '0 18px 40px rgba(0, 0, 0, 0.8)',
    '0 20px 44px rgba(0, 0, 0, 0.8)',
    '0 22px 48px rgba(0, 0, 0, 0.9)',
    '0 24px 52px rgba(0, 0, 0, 0.9)',
    '0 26px 56px rgba(0, 0, 0, 1)',
    '0 28px 60px rgba(0, 0, 0, 1)',
    '0 30px 64px rgba(0, 0, 0, 1)',
    '0 32px 68px rgba(0, 0, 0, 1)',
    '0 34px 72px rgba(0, 0, 0, 1)',
    '0 36px 76px rgba(0, 0, 0, 1)',
    '0 38px 80px rgba(0, 0, 0, 1)',
    '0 40px 84px rgba(0, 0, 0, 1)',
    '0 42px 88px rgba(0, 0, 0, 1)',
    '0 44px 92px rgba(0, 0, 0, 1)',
    '0 46px 96px rgba(0, 0, 0, 1)',
    '0 48px 100px rgba(0, 0, 0, 1)',
  ]
});

export default blueGlassTheme;
