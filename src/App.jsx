import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppContextProvider } from "./context/AppContext";
import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import Favoritos from "./components/favoritos/Favoritos";
import Configuracion from "./components/configuracion/Configuracion";
import ProductDetails from "./components/productDetails/ProductDetails";
import ProductForm from "./components/productForm/ProductForm";
import NotFound from "./components/pages/NotFound";
import About from "./components/pages/About";
import Help from "./components/pages/Help";

import Registro from "./components/pages/Registro";
import Login from "./components/pages/Login";
import PrivateRoute from "./components/PrivateRoute";

// Importar el tema desde el archivo separado
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContextProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="acerca" element={<About />} />
                <Route path="ayuda" element={<Help />} />
                <Route path="favoritos" element={<Favoritos />} />
                <Route path="configuracion" element={<Configuracion />} />
                <Route path="producto/:id" element={<ProductDetails />} />
                <Route
                  path="crear-producto"
                  element={<ProductForm mode="create" />}
                />
                <Route
                  path="editar-producto/:id"
                  element={<ProductForm mode="edit" />}
                />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
