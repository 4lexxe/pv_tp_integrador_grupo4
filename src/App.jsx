import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProvider } from './context/AppContext';
import Home from './components/home/Home';

//----------------------------
// CONFIGURACIÓN DEL TEMA
//----------------------------
const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Home />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;