import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Button,
  Alert,
  Chip,
} from "@mui/material";
import { Download, Upload } from "@mui/icons-material";
import { useFavoritos } from "../../context/FavoritosContext";
import { useProductos } from "../../context/ProductosContext";
import { useAppSync } from "../../hooks/useAppSync.jsx";

const Configuracion = () => {
  const {
    exportarFavoritos,
    importarFavoritos,
    cantidadFavoritos,
    limpiarFavoritos,
  } = useFavoritos();
  const {
    obtenerEstadisticas,
    refrescarProductos,
    limpiarCacheAPI,
    loading,
    eliminarProductosLocales,
  } = useProductos();
  const { isOnline, tabsConnected, lastSync, syncStatus } = useAppSync();

  const stats = obtenerEstadisticas();

  const handleExportar = () => {
    try {
      const datos = exportarFavoritos();
      const blob = new Blob([datos], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `favoritos-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("Error al exportar favoritos");
    }
  };

  const handleImportar = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const resultado = importarFavoritos(e.target.result);
            alert(
              resultado
                ? "Favoritos importados correctamente"
                : "Error: Formato inválido"
            );
          } catch (error) {
            alert("Error al importar favoritos");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        ⚙️ Configuración
      </Typography>

      {/* Sincronización */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🔄 Sincronización
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            <Chip
              label={`Estado: ${syncStatus}`}
              color={isOnline ? "success" : "error"}
            />
            <Chip
              label={`Pestañas activas: ${tabsConnected}`}
              color="primary"
            />
            <Chip
              label={`Última sync: ${lastSync.toLocaleTimeString()}`}
              color="info"
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Los cambios se sincronizan automáticamente entre todas las pestañas
            abiertas
          </Typography>
        </CardContent>
      </Card>

      {/* Productos y API */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🛍️ Productos
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            <Chip label={`Total: ${stats.totalProductos}`} color="primary" />
            <Chip label={`API: ${stats.productosAPI}`} color="info" />
            <Chip
              label={`Locales: ${stats.productosLocales}`}
              color="secondary"
            />
            <Chip label={`Categorías: ${stats.categorias}`} color="success" />
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Última actualización API: {stats.lastApiUpdate}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              onClick={async () => {
                try {
                  await refrescarProductos();
                  alert("Productos actualizados desde la API");
                } catch (error) {
                  alert("Error al actualizar productos");
                }
              }}
              disabled={loading}
            >
              {loading ? "Actualizando..." : "Actualizar API"}
            </Button>

            <Button
              variant="outlined"
              color="warning"
              onClick={() => {
                if (window.confirm("¿Limpiar cache de productos de API?")) {
                  limpiarCacheAPI();
                  alert("Cache limpiado");
                }
              }}
            >
              Limpiar Cache
            </Button>

            <Button
              variant="outlined"
              color="warning"
              onClick={() => {
                if (window.confirm("¿Borrar productos locales creados?")) {
                  eliminarProductosLocales();
                  alert("Productos borrados correctamente");
                }
              }}
            >
              Borrar Productos Locales
            </Button>
          </Box>

          {stats.needsUpdate && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Los productos de API necesitan actualización (más de 30 minutos)
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Sistema */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📊 Sistema
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip label="React 18" color="primary" />
            <Chip label="Material UI v5" color="secondary" />
            <Chip label="Context API" color="success" />
            <Chip label="React Router v6" color="info" />
          </Box>
        </CardContent>
      </Card>

      {/* Favoritos */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            💖 Favoritos
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Tienes {cantidadFavoritos()} productos favoritos
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              startIcon={<Download />}
              variant="outlined"
              onClick={handleExportar}
              disabled={cantidadFavoritos() === 0}
            >
              Exportar
            </Button>
            <Button
              startIcon={<Upload />}
              variant="outlined"
              onClick={handleImportar}
            >
              Importar
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => limpiarFavoritos()}
              disabled={cantidadFavoritos() === 0}
            >
              Limpiar
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Interfaz */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🎨 Interfaz
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Animaciones"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Tema oscuro"
            />
            <FormControlLabel control={<Switch />} label="Modo compacto" />
          </Box>
        </CardContent>
      </Card>

      <Alert severity="info">
        Configuración de ejemplo usando React Router DOM y Material UI.
      </Alert>
    </Box>
  );
};

export default Configuracion;
