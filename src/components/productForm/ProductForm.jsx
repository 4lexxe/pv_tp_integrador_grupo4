import React from "react";
import { useParams } from "react-router-dom";
import { Container, Card, CardContent, Alert, Typography } from "@mui/material";
import { useProductos } from "../../context/ProductosContext.jsx";
import { useProductForm } from "../../hooks/useProductForm.jsx";
import {
  generatePlaceholderImage,
  categoriasConfig,
} from "../../utils/imageUtils.jsx";
import FormHeader from "./FormHeader.jsx";
import FormFields from "./FormFields.jsx";
import FormActions from "./FormActions.jsx";

const ProductForm = ({ mode = "create" }) => {
  const { id } = useParams();
  const { obtenerCategorias } = useProductos();

  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useProductForm(mode, id);

  const categorias = {
    opciones: categoriasConfig.opciones,
    existentes: obtenerCategorias(),
  };
  const handleGenerateImage = () => {
    const imageUrl = generatePlaceholderImage(formData.nombre);
    handleChange("imagen", imageUrl);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await handleSubmit();
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <FormHeader mode={mode} />

      <Card>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={onSubmit}>
            <FormFields
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onGenerateImage={handleGenerateImage}
              categorias={categorias}
            />

            <FormActions
              mode={mode}
              isSubmitting={isSubmitting}
              onSubmit={onSubmit}
            />
          </form>
        </CardContent>
      </Card>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          💡 <strong>Consejos:</strong> Solo ingresa números para el precio (ej:
          999.99), el símbolo $ se agregará automáticamente. Usa nombres
          descriptivos y URLs de imágenes válidas.
        </Typography>
      </Alert>
    </Container>
  );
};

export default ProductForm;
