// Componente de temporizador visual reutilizable

import React from 'react';
import { Clock } from 'lucide-react';

export interface TimerProps {
  timeRemaining: number;
  warningThreshold?: number;
  criticalThreshold?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function Timer({
  timeRemaining,
  warningThreshold = 10,
  criticalThreshold = 5,
  className = '',
  size = 'md',
  showIcon = true,
}: TimerProps) {
  const isCritical = timeRemaining <= criticalThreshold;
  const isWarning = timeRemaining <= warningThreshold && !isCritical;
  const isNormal = !isWarning && !isCritical;

  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  const containerClasses = {
    sm: 'px-3 py-1',
    md: 'px-4 py-2',
    lg: 'px-6 py-3',
  };

  const bgColor = isCritical
    ? 'bg-red-500/30'
    : isWarning
    ? 'bg-yellow-500/30'
    : 'bg-blue-500/30';

  const textColor = isCritical
    ? 'text-red-400'
    : isWarning
    ? 'text-yellow-400'
    : 'text-blue-400';

  const shouldPulse = isCritical;

  return (
    <div
      className={`rounded-lg ${bgColor} ${
        containerClasses[size]
      } ${className} ${shouldPulse ? 'animate-pulse' : ''}`}
    >
      <div className="text-sm text-slate-300 text-center mb-1">Tiempo</div>
      <div className={`${sizeClasses[size]} font-bold ${textColor} flex items-center justify-center gap-2`}>
        {showIcon && <Clock className={size === 'lg' ? 'w-8 h-8' : size === 'md' ? 'w-6 h-6' : 'w-4 h-4'} />}
        {timeRemaining}s
      </div>
    </div>
  );
}