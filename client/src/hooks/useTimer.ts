// Hook reutilizable para temporizador de cuenta regresiva

import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseTimerConfig {
  initialTime: number;
  onTick?: (timeRemaining: number) => void; // timeRemaining en milisegundos
  onTimeUp?: () => void;
  onWarning?: (timeRemaining: number) => void;
  warningThreshold?: number;
  updateInterval?: number;
}

export interface UseTimerReturn {
  timeRemaining: number;
  timeRemainingSeconds: number;
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
    updateInterval = 10,
  } = config;

  const usarVariable = (e: unknown) => e; // funcion dummy momentanea para evitar warning de variable no usada
  usarVariable(updateInterval);

  const initialTimeMs = initialTime * 1000;
  const warningThresholdMs = warningThreshold * 1000;

  const [timeRemaining, setTimeRemaining] = useState(initialTimeMs);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const animationFrameRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);
  const targetTimeRef = useRef<number>(0);
  const warningFiredRef = useRef(false);

  const stop = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsRunning(false);
    setIsPaused(false);
  }, []);

  const start = useCallback(() => {
    stop();
    const now = performance.now();
    targetTimeRef.current = now + initialTimeMs;
    lastTickRef.current = now;
    setTimeRemaining(initialTimeMs);
    setIsRunning(true);
    setIsPaused(false);
    warningFiredRef.current = false;
  }, [initialTimeMs, stop]);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    const now = performance.now();
    const remaining = timeRemaining;
    targetTimeRef.current = now + remaining;
    lastTickRef.current = now;
    setIsPaused(false);
  }, [timeRemaining]);

  const reset = useCallback((newTime?: number) => {
    stop();
    const resetTime = (newTime ?? initialTime) * 1000;
    setTimeRemaining(resetTime);
    warningFiredRef.current = false;
  }, [initialTime, stop]);

  const addTime = useCallback((seconds: number) => {
    const addMs = seconds * 1000;
    targetTimeRef.current += addMs;
    setTimeRemaining(prev => prev + addMs);
  }, []);

  useEffect(() => {
    if (!isRunning || isPaused) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const animate = (currentTime: number) => {
      const remaining = targetTimeRef.current - currentTime;
      const newTime = Math.max(0, remaining);

      setTimeRemaining(newTime);

      // Callback de tick
      if (onTick) {
        onTick(newTime);
      }

      // Warning
      if (
        onWarning &&
        !warningFiredRef.current &&
        newTime <= warningThresholdMs &&
        newTime > 0
      ) {
        warningFiredRef.current = true;
        onWarning(newTime);
      }

      // Tiempo agotado
      if (newTime <= 0) {
        setIsRunning(false);
        if (onTimeUp) {
          onTimeUp();
        }
        return;
      }

      // Continuar animación
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, isPaused, onTick, onTimeUp, onWarning, warningThresholdMs]);

  return {
    timeRemaining,
    timeRemainingSeconds: timeRemaining / 1000,
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