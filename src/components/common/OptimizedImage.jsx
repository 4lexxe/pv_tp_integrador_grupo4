import React, { useState, useRef, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';

const OptimizedImage = ({ 
  src, 
  alt, 
  width = '100%', 
  height = 200, 
  fallbackSrc = 'https://via.placeholder.com/300x200/e0e0e0/757575?text=Sin+Imagen',
  sx = {},
  ...props 
}) => {
  const [imageState, setImageState] = useState('loading');
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef();

  // Actualizar src cuando cambie la prop
  useEffect(() => {
    if (src !== currentSrc) {
      setCurrentSrc(src);
      setImageState('loading');
    }
  }, [src]);

  const handleLoad = () => {
    setImageState('loaded');
  };

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setImageState('loading');
    } else {
      setImageState('error');
    }
  };

  const handleImageStart = () => {
    setImageState('loading');
  };

  return (
    <Box 
      sx={{ 
        position: 'relative', 
        width, 
        height: typeof height === 'number' ? `${height}px` : height,
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx 
      }}
      {...props}
    >
      {/* Skeleton mientras carga */}
      {imageState === 'loading' && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
          }}
        />
      )}

      {/* Imagen principal */}
      {imageState !== 'error' && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          onLoadStart={handleImageStart}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageState === 'loaded' ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            display: 'block'
          }}
        />
      )}

      {/* Fallback final si todo falla */}
      {imageState === 'error' && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            color: '#666',
            fontSize: '14px',
            textAlign: 'center',
            p: 2
          }}
        >
          🖼️ Imagen no disponible
        </Box>
      )}
    </Box>
  );
};

export default OptimizedImage;
