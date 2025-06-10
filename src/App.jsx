import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import Favoritos from './components/favoritos/Favoritos';
import Configuracion from './components/configuracion/Configuracion';

const theme = createTheme({
  components: {
    MuiCard: { styleOverrides: { root: { borderRadius: 12 } } },
    MuiButton: { styleOverrides: { root: { textTransform: 'none' } } }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="favoritos" element={<Favoritos />} />
              <Route path="configuracion" element={<Configuracion />} />
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;