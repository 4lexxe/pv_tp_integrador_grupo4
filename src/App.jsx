import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProvider } from './context/AppContext';
import Home from './components/home/Home';

//----------------------------
// CONFIGURACIÓN DEL TEMA
//----------------------------
const theme = createTheme();

/**
 * Componente principal de la aplicación
 * Configura el tema de Material UI y el estado global
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* AppProvider envuelve toda la aplicación con los contextos necesarios */}
      <AppProvider>
        <Home />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;