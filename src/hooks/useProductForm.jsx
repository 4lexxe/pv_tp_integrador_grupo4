import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductos } from '../context/AppContext';

export const useProductForm = (mode, id) => {
  const navigate = useNavigate();
  const { obtenerProductoPorId, agregarProducto, actualizarProducto } = useProductos();

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    imagen: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar producto para editar
  useEffect(() => {
    if (mode === 'edit' && id) {
      const producto = obtenerProductoPorId(parseInt(id));
      if (producto) {
        setFormData({
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio.replace('$', ''),
          categoria: producto.categoria,
          imagen: producto.imagen
        });
      } else {
        navigate('/');
      }
    }
  }, [mode, id, obtenerProductoPorId, navigate]);

  // Validaciones
  const validators = {
    nombre: (value) => {
      if (!value.trim()) return 'El nombre es obligatorio';
      if (value.length < 3) return 'El nombre debe tener al menos 3 caracteres';
      return '';
    },
    descripcion: (value) => {
      if (!value.trim()) return 'La descripción es obligatoria';
      if (value.length < 10) return 'La descripción debe tener al menos 10 caracteres';
      return '';
    },
    precio: (value) => {
      if (!value.trim()) return 'El precio es obligatorio';
      const numero = parseFloat(value);
      if (isNaN(numero) || numero <= 0) return 'El precio debe ser un número válido mayor a 0';
      if (numero > 999999.99) return 'El precio no puede ser mayor a $999,999.99';
      return '';
    },
    categoria: (value) => !value ? 'La categoría es obligatoria' : '',
    imagen: (value) => {
      if (!value.trim()) return 'La URL de la imagen es obligatoria';
      if (!value.match(/^https?:\/\/.+/)) return 'Debe ser una URL válida (http:// o https://)';
      return '';
    }
  };

  const handleChange = (field, value) => {
    // Procesamiento especial para precio
    if (field === 'precio') {
      value = value.replace(/[^0-9.,]/g, '').replace(',', '.');
      const parts = value.split('.');
      if (parts.length > 2) value = parts[0] + '.' + parts[1];
      if (parts[1]?.length > 2) value = parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validar campo individual
    if (errors[field]) {
      const error = validators[field](value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(validators).forEach(field => {
      const error = validators[field](formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return false;

    setIsSubmitting(true);
    try {
      const datosConPrecio = { ...formData, precio: `$${formData.precio}` };
      
      if (mode === 'create') {
        await agregarProducto(datosConPrecio);
        alert('Producto creado exitosamente');
      } else {
        await actualizarProducto(parseInt(id), datosConPrecio);
        alert('Producto actualizado exitosamente');
      }
      
      navigate('/');
      return true;
    } catch (error) {
      alert(error.message || 'Error al guardar el producto');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    validateForm
  };
};
