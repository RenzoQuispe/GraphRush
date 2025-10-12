// Componente de temporizador visual reutilizable

import { Clock } from 'lucide-react';

export interface TimerProps {
  timeRemaining: number;
  warningThreshold?: number;
  criticalThreshold?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showMilliseconds?: boolean;
}

export function Timer({
  timeRemaining,
  warningThreshold = 10,
  criticalThreshold = 5,
  className = '',
  size = 'md',
  showIcon = true,
  showMilliseconds = true,
}: TimerProps) {

  const timeInSeconds = timeRemaining / 1000;
  const isCritical = timeRemaining <= criticalThreshold;
  const isWarning = timeRemaining <= warningThreshold && !isCritical;

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

  // formatear tiempo
  const seconds = Math.floor(timeInSeconds);
  const milliseconds = Math.floor((timeRemaining % 1000) / 10); // Mostrar centésimas
  const formattedTime = showMilliseconds
    ? `${seconds}.${milliseconds.toString().padStart(2, '0')}s`
    : `${seconds}s`;

  return (
    <div
      className={`rounded-lg ${bgColor} ${containerClasses[size]
        } ${className} ${shouldPulse ? 'animate-pulse' : ''}`}
    >
      <div className="text-sm text-slate-300 text-center mb-1">Tiempo</div>
      <div className={`${sizeClasses[size]} font-bold ${textColor} flex items-center justify-center gap-2`}>
        {showIcon && <Clock className={size === 'lg' ? 'w-8 h-8' : size === 'md' ? 'w-6 h-6' : 'w-4 h-4'} />}
        {formattedTime}
      </div>
    </div>
  );
}