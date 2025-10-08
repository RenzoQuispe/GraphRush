// Hook para usar el sistema de sonidos

import { useCallback, useEffect, useState } from 'react';
import type { SoundType } from '../services/soundService';
import { SoundService } from '../services/soundService';
import { StorageService } from '../services/storageService';
import { STORAGE_KEYS } from '../utils/constants';

export interface UseSoundReturn {
  play: (type: SoundType) => void;
  playCustom: (frequency: number, duration: number, volume?: number) => void;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  toggle: () => void;
}

export function useSound(): UseSoundReturn {
  const [enabled, setEnabledState] = useState(() => {
    const stored = StorageService.get<boolean>(STORAGE_KEYS.SOUND_ENABLED);
    return stored !== null ? stored : true;
  });

  const soundService = SoundService.getInstance();

  useEffect(() => {
    soundService.setEnabled(enabled);
  }, [enabled, soundService]);

  const setEnabled = useCallback((value: boolean) => {
    setEnabledState(value);
    StorageService.set(STORAGE_KEYS.SOUND_ENABLED, value);
  }, []);

  const toggle = useCallback(() => {
    setEnabled(!enabled);
  }, [enabled, setEnabled]);

  const play = useCallback(
    (type: SoundType) => {
      soundService.play(type);
    },
    [soundService]
  );

  const playCustom = useCallback(
    (frequency: number, duration: number, volume?: number) => {
      soundService.playCustom(frequency, duration, volume);
    },
    [soundService]
  );

  return {
    play,
    playCustom,
    enabled,
    setEnabled,
    toggle,
  };
}