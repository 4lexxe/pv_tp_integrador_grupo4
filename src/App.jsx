import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { FavoritosProvider } from './context/FavoritosContext';
import Home from './components/home/Home';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FavoritosProvider>
        <Home />
      </FavoritosProvider>
    </ThemeProvider>
  );
}

export default App;