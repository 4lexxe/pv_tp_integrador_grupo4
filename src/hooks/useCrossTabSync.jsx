import { useEffect, useRef } from 'react';

//----------------------------
// HOOK PARA SINCRONIZACIÓN ENTRE PESTAÑAS
//----------------------------

/**
 * Hook personalizado para sincronizar estado entre múltiples pestañas/ventanas
 */
export const useCrossTabSync = (channelName, onMessage) => {
  const channelRef = useRef(null);

  useEffect(() => {
    if ('BroadcastChannel' in window) {
      channelRef.current = new BroadcastChannel(channelName);
      channelRef.current.onmessage = (event) => onMessage(event.data);
    }

    const handleStorageChange = (event) => {
      if (event.key && event.newValue) {
        try {
          const data = JSON.parse(event.newValue);
          onMessage({ type: 'STORAGE_UPDATE', key: event.key, data });
        } catch (error) {
          console.warn('Error parsing storage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      channelRef.current?.close();
    };
  }, [channelName, onMessage]);

  const sendMessage = (message) => channelRef.current?.postMessage(message);

  return { sendMessage };
};
