# Sistema de Gestión de Productos - Grupo 4

Este proyecto es un sistema completo de gestión de productos desarrollado con React, Material UI y Context API. Utiliza una API externa (FakeStore API) y permite la gestión de productos locales.

## Características

- 🛍️ Catálogo de productos con datos reales de API
- ❤️ Sistema de favoritos con persistencia
- 📱 Diseño responsive y adaptable
- 🔄 Sincronización automática entre pestañas
- 📊 Dashboard con métricas visuales
- 🎨 Tema cristalino azul personalizado

## Tecnologías Utilizadas

- React 18 con Hooks
- Material UI v5
- React Router v6
- Context API para estado global
- Vite como bundler
- Axios para peticiones HTTP
- LocalStorage para persistencia

## Instrucciones de Uso

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Navegar al directorio
cd pv_tp_integrador_grupo4

# Instalar dependencias
npm install
```

### Ejecución

```bash
# Modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de la versión compilada
npm run preview
```

## Despliegue en Vercel

Esta aplicación está configurada para desplegarse fácilmente en Vercel:

1. Crea una cuenta en [Vercel](https://vercel.com/)
2. Instala la CLI de Vercel: `npm i -g vercel`
3. Ejecuta `vercel login` y sigue las instrucciones
4. Para desplegar, simplemente ejecuta `vercel` en el directorio del proyecto

O directamente conecta tu repositorio de GitHub/GitLab/Bitbucket a Vercel para despliegue automático.

## Estructura del Proyecto

- `/src`: Código fuente de la aplicación
  - `/components`: Componentes React organizados por funcionalidad
  - `/context`: Contextos para estado global usando Context API
  - `/hooks`: Custom hooks reutilizables
  - `/services`: Servicios para comunicación con APIs externas
  - `/utils`: Utilidades y helpers
  - `/theme`: Configuración de tema personalizado

## Créditos

Desarrollado por Grupo 4 para la materia Programación Visual.

1. Alex Gabriel Calatayud - 4lexxe
2. Eduardo Tiago Rodriguez - EduardTr48
3. Rodriguez Pablo Alejandro - PabloRZ-AL