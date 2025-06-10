import { useEffect, useState } from 'react';

//----------------------------
// HOOK GLOBAL PARA SINCRONIZACIÓN DE LA APP
//----------------------------

/**
 * Hook para mostrar indicadores de sincronización entre pestañas
 */
export const useAppSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState(new Date());
  const [tabsConnected, setTabsConnected] = useState(1);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel('tab-count');
      const activeTabs = new Set(['current']);
      
      const pingInterval = setInterval(() => {
        channel.postMessage({ type: 'PING', timestamp: Date.now() });
      }, 5000);

      channel.onmessage = (event) => {
        if (event.data.type === 'PING') {
          activeTabs.add(event.data.timestamp);
          setTabsConnected(activeTabs.size);
          setLastSync(new Date());
          
          // Limpiar tabs antiguos
          const now = Date.now();
          [...activeTabs].forEach(timestamp => {
            if (typeof timestamp === 'number' && now - timestamp > 10000) {
              activeTabs.delete(timestamp);
            }
          });
        }
      };

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        clearInterval(pingInterval);
        channel.close();
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isOnline,
    lastSync,
    tabsConnected,
    syncStatus: isOnline ? 'connected' : 'offline'
  };
};
