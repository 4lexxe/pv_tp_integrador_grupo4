import React, { useState } from 'react';
import { 
  Box, Typography, Container, Card, CardContent, Accordion, 
  AccordionSummary, AccordionDetails, Alert, Chip 
} from '@mui/material';
import { ExpandMore, Help as HelpIcon, Favorite, Add, Settings } from '@mui/icons-material';

const Help = () => {
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      id: 'panel1',
      pregunta: '¿Cómo agregar productos a favoritos?',
      respuesta: 'Haz clic en el icono de corazón en cualquier tarjeta de producto. Los favoritos se guardan automáticamente y se sincronizan entre pestañas. Puedes tener hasta 50 productos favoritos.',
      icon: <Favorite color="error" />
    },
    {
      id: 'panel2',
      pregunta: '¿Cómo crear un nuevo producto?',
      respuesta: 'Usa el botón "Crear Producto" en la página principal. Completa todos los campos obligatorios: nombre, descripción, precio (solo números), categoría y URL de imagen. Los productos creados localmente pueden ser editados posteriormente.',
      icon: <Add color="primary" />
    },
    {
      id: 'panel3',
      pregunta: '¿Por qué no puedo editar algunos productos?',
      respuesta: 'Los productos obtenidos de la API externa (FakeStore) son de solo lectura. Solo puedes editar productos que hayas creado localmente. Estos se identifican con el chip "Local" en las tarjetas.',
      icon: <Settings color="warning" />
    },
    {
      id: 'panel4',
      pregunta: '¿Cómo funciona la sincronización entre pestañas?',
      respuesta: 'Los cambios en favoritos y productos locales se sincronizan automáticamente entre todas las pestañas abiertas usando BroadcastChannel API. Verás los contadores de pestañas activas en la barra superior.',
      icon: <HelpIcon color="info" />
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom textAlign="center">
        Centro de Ayuda
      </Typography>
      
      <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
        Encuentra respuestas a las preguntas más frecuentes
      </Typography>

      {/* Guía rápida */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Guía Rápida de Inicio
        </Typography>
        <Typography variant="body2">
          1. Explora el catálogo de productos en la página principal
          <br />
          2. Agrega productos a favoritos haciendo clic en el corazón
          <br />
          3. Crea nuevos productos con el botón "Crear Producto"
          <br />
          4. Gestiona tus favoritos en la sección dedicada
          <br />
          5. Configura la aplicación desde el menú de configuración
        </Typography>
      </Alert>

      {/* FAQs */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Preguntas Frecuentes
      </Typography>

      {faqs.map((faq) => (
        <Accordion
          key={faq.id}
          expanded={expanded === faq.id}
          onChange={handleChange(faq.id)}
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {faq.icon}
              <Typography variant="h6">
                {faq.pregunta}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              {faq.respuesta}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Características técnicas */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Características Técnicas
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            <Chip label="Persistencia Local" color="primary" size="small" />
            <Chip label="Sincronización Multiventana" color="secondary" size="small" />
            <Chip label="API Externa" color="success" size="small" />
            <Chip label="Cache Inteligente" color="info" size="small" />
          </Box>
          
          <Typography variant="body2" color="text.secondary">
            La aplicación utiliza tecnologías modernas para ofrecer una experiencia fluida y confiable. 
            Todos los datos se guardan localmente y se sincronizan automáticamente entre pestañas.
          </Typography>
        </CardContent>
      </Card>

      {/* Límites y consideraciones */}
      <Alert severity="warning" sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Límites y Consideraciones
        </Typography>
        <Typography variant="body2">
          • Máximo 50 productos en favoritos
          <br />
          • Los productos de API externa no pueden editarse
          <br />
          • Los datos se almacenan localmente en tu navegador
          <br />
          • La sincronización funciona solo entre pestañas del mismo navegador
        </Typography>
      </Alert>
    </Container>
  );
};

export default Help;
