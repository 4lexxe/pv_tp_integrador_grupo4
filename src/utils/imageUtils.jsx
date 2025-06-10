export const generatePlaceholderImage = (nombre) => {
  const colors = ['1976d2', 'dc004e', '2e7d32', 'ff9800', '9c27b0', '795548'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const text = nombre.replace(/\s+/g, '+') || 'Producto';
  return `https://via.placeholder.com/300x200/${randomColor}/ffffff?text=${text}`;
};

export const categoriasConfig = {
  opciones: [
    'Electrónicos',
    'Computadoras', 
    'Audio',
    'Periféricos',
    'Tablets',
    'Fotografía',
    'Accesorios',
    'Gaming'
  ]
};
