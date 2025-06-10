import React from 'react';
import { Box, Typography, Container, Card, CardContent, Grid, Chip } from '@mui/material';
import { Code, Storage, Sync, Speed } from '@mui/icons-material';

const About = () => {
  const tecnologias = [
    'React 18', 'Material UI v5', 'React Router v6', 'Context API', 
    'Axios', 'LocalStorage', 'BroadcastChannel', 'Vite'
  ];

  const caracteristicas = [
    {
      icon: <Code />,
      titulo: 'Arquitectura Moderna',
      descripcion: 'Desarrollado con React 18 y hooks modernos para máximo rendimiento'
    },
    {
      icon: <Storage />,
      titulo: 'Persistencia Local',
      descripcion: 'Datos guardados en localStorage con sincronización automática'
    },
    {
      icon: <Sync />,
      titulo: 'Sincronización Multiventana',
      descripcion: 'Cambios reflejados instantáneamente en todas las pestañas abiertas'
    },
    {
      icon: <Speed />,
      titulo: 'API Externa',
      descripcion: 'Integración con FakeStore API para productos reales con cache inteligente'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom textAlign="center">
        Acerca del Proyecto
      </Typography>
      
      <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
        Sistema de Gestión de Productos - TP Integrador Grupo 4
      </Typography>

      {/* Descripción */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Descripción del Proyecto
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
            Esta aplicación es un sistema completo de gestión de productos desarrollado como trabajo práctico 
            integrador. Combina productos reales obtenidos de una API externa (FakeStore API) con la capacidad 
            de crear y gestionar productos locales. El sistema incluye funcionalidades avanzadas como favoritos 
            persistentes, sincronización entre pestañas y una interfaz moderna con Material UI.
          </Typography>
          
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            El proyecto demuestra el uso de tecnologías modernas de React incluyendo Context API para gestión 
            de estado, React Router para navegación SPA, integración con APIs externas usando Axios, y 
            persistencia de datos con localStorage. Además, implementa sincronización en tiempo real entre 
            múltiples ventanas del navegador usando BroadcastChannel API.
          </Typography>
        </CardContent>
      </Card>

      {/* Características */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Características Principales
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {caracteristicas.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {React.cloneElement(item.icon, { sx: { fontSize: 48 } })}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {item.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.descripcion}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tecnologías */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Tecnologías Utilizadas
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            {tecnologias.map((tech) => (
              <Chip key={tech} label={tech} color="primary" variant="outlined" />
            ))}
          </Box>
          
          <Typography variant="body2" color="text.secondary">
            El proyecto utiliza únicamente dependencias esenciales manteniendo un bundle limpio y optimizado.
          </Typography>
        </CardContent>
      </Card>

      {/* Funcionalidades */}
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Funcionalidades Implementadas
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="primary">
                Gestión de Productos
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li>Catálogo híbrido (API + locales)</li>
                <li>CRUD completo para productos locales</li>
                <li>Vista detallada con rating real</li>
                <li>Categorización automática</li>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="primary">
                Sistema de Favoritos
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li>Límite de 50 favoritos</li>
                <li>Exportar/Importar en JSON</li>
                <li>Sincronización entre pestañas</li>
                <li>Persistencia automática</li>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="primary">
                Interfaz y UX
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li>Diseño responsive completo</li>
                <li>Optimización de imágenes</li>
                <li>Estados de carga y error</li>
                <li>Navegación SPA fluida</li>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="primary">
                Características Técnicas
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li>Arquitectura modular escalable</li>
                <li>Hooks personalizados reutilizables</li>
                <li>Cache inteligente para API</li>
                <li>Validaciones en tiempo real</li>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default About;
