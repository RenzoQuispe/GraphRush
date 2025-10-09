// display de puntuación reutilizable

import { Trophy, Star } from 'lucide-react';

export interface ScoreDisplayProps {
  score: number;
  label?: string;
  icon?: 'trophy' | 'star' | 'none';
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ScoreDisplay({
  score,
  label = 'Puntos',
  icon = 'star',
  color = 'text-green-400',
  size = 'md',
  className = '',
}: ScoreDisplayProps) {
  const sizeClasses = {
    sm: { text: 'text-lg', icon: 'w-4 h-4', label: 'text-xs' },
    md: { text: 'text-2xl', icon: 'w-5 h-5', label: 'text-sm' },
    lg: { text: 'text-4xl', icon: 'w-6 h-6', label: 'text-base' },
  };

  const IconComponent = icon === 'trophy' ? Trophy : icon === 'star' ? Star : null;

  return (
    <div className={`text-center ${className}`}>
      <div className={`${sizeClasses[size].label} text-slate-300`}>{label}</div>
      <div className={`${sizeClasses[size].text} font-bold ${color} flex items-center justify-center gap-1`}>
        {IconComponent && <IconComponent className={sizeClasses[size].icon} />}
        {score.toLocaleString()}
      </div>
    </div>
  );
}