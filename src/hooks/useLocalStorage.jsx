import { useState } from 'react';

/**
 * Hook personalizado para manejar el estado persistente en localStorage
 */
export const useLocalStorage = (key, initialValue) => {
  // Estado inicial basado en localStorage o valor inicial
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error al acceder a localStorage:', error);
      return initialValue;
    }
  });

  /**
   * Actualiza el estado y lo guarda en localStorage
   */
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  };

  /**
   * Elimina el valor del estado y de localStorage
   */
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error al eliminar de localStorage:', error);
    }
  };

  return [storedValue, setValue, removeValue];
};