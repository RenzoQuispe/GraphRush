// Hook para manejar localStorage

import { useState, useCallback, useEffect } from 'react';
import { StorageService } from '../services/storageService';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  
  // estado inicial desde localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    const stored = StorageService.get<T>(key);
    return stored !== null ? stored : initialValue;
  });

  // función para actualizar el valor
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue(prev => {
        const newValue = value instanceof Function ? value(prev) : value;
        StorageService.set(key, newValue);
        return newValue;
      });
    },
    [key]
  );

  // función para eliminar el valor
  const removeValue = useCallback(() => {
    StorageService.remove(key);
    setStoredValue(initialValue);
  }, [key, initialValue]);

  // sincronizar con cambios en otras pestañas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Error parsing storage value:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}