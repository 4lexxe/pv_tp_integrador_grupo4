export const generatePlaceholderImage = (nombre) => {
  const colors = ["1976d2", "dc004e", "2e7d32", "ff9800", "9c27b0", "795548"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const text = nombre.replace(/\s+/g, "+") || "Producto";
  return `https://via.placeholder.com/300x200/${randomColor}/ffffff?text=${text}`;
};

export const getImageFallback = (type = "product") => {
  const fallbacks = {
    product:
      "https://via.placeholder.com/300x200/e0e0e0/757575?text=Sin+Imagen",
    preview:
      "https://via.placeholder.com/300x200/cccccc/666666?text=Error+al+cargar",
    avatar: "https://via.placeholder.com/100x100/e0e0e0/757575?text=👤",
  };
  return fallbacks[type] || fallbacks.product;
};

export const categoriasConfig = {
  opciones: [
    "Electrónicos",
    "Computadoras",
    "Audio",
    "Periféricos",
    "Tablets",
    "Fotografía",
    "Accesorios",
    "Gaming",
    "Ropa Masculina",
    "Ropa Femenina",
    "Joyería",
  ],
};
