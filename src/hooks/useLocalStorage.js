import { useState, useEffect } from 'react';

//----------------------------
// HOOK PERSONALIZADO PARA LOCALSTORAGE
//----------------------------

/**
 * Hook personalizado para manejar localStorage de forma reactiva
 * Persiste datos automáticamente y los sincroniza entre pestañas
 */
export const useLocalStorage = (key, initialValue) => {
  // Estado que se sincroniza con localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para actualizar el valor
  const setValue = (value) => {
    try {
      // Permitir que value sea una función como en useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Guardar en localStorage
      if (valueToStore instanceof Set) {
        // Convertir Set a Array para localStorage
        window.localStorage.setItem(key, JSON.stringify([...valueToStore]));
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Función para eliminar del localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};
