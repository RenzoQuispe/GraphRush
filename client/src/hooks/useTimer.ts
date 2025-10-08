// Hook reutilizable para temporizador de cuenta regresiva

import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseTimerConfig {
  initialTime: number;
  onTick?: (timeRemaining: number) => void;
  onTimeUp?: () => void;
  onWarning?: (timeRemaining: number) => void;
  warningThreshold?: number;
}

export interface UseTimerReturn {
  timeRemaining: number;
  isRunning: boolean;
  isPaused: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: (newTime?: number) => void;
  addTime: (seconds: number) => void;
  stop: () => void;
}

export function useTimer(config: UseTimerConfig): UseTimerReturn {
  const {
    initialTime,
    onTick,
    onTimeUp,
    onWarning,
    warningThreshold = 10,
  } = config;

  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const warningFiredRef = useRef(false);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setIsPaused(false);
  }, []);

  const start = useCallback(() => {
    stop();
    setTimeRemaining(initialTime);
    setIsRunning(true);
    setIsPaused(false);
    warningFiredRef.current = false;
  }, [initialTime, stop]);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const reset = useCallback((newTime?: number) => {
    stop();
    const resetTime = newTime ?? initialTime;
    setTimeRemaining(resetTime);
    warningFiredRef.current = false;
  }, [initialTime, stop]);

  const addTime = useCallback((seconds: number) => {
    setTimeRemaining(prev => Math.max(0, prev + seconds));
  }, []);

  useEffect(() => {
    if (!isRunning || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        // callback de tick
        if (onTick) {
          onTick(newTime);
        }
        // advertencia
        if (
          onWarning &&
          !warningFiredRef.current &&
          newTime <= warningThreshold &&
          newTime > 0
        ) {
          warningFiredRef.current = true;
          onWarning(newTime);
        }
        // tiempo agotado
        if (newTime <= 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsRunning(false);
          if (onTimeUp) {
            onTimeUp();
          }
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, onTick, onTimeUp, onWarning, warningThreshold]);

  return {
    timeRemaining,
    isRunning,
    isPaused,
    start,
    pause,
    resume,
    reset,
    addTime,
    stop,
  };
}