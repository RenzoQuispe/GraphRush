// opciones del juego

import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';

export interface GameControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  soundEnabled: boolean;
  onTogglePause: () => void;
  onResetGraph: () => void;
  onToggleSound: () => void;
}

export function GameControls({
  isPlaying,
  isPaused,
  isGameOver,
  soundEnabled,
  onTogglePause,
  onResetGraph,
  onToggleSound,
}: GameControlsProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border space-y-3">
      <h3 className="text-lg font-bold mb-4">Opciones</h3>
      
      <Button
        onClick={onTogglePause}
        disabled={!isPlaying || isGameOver}
        variant="secondary"
        size="md"
        icon={isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        className="w-full"
      >
        {isPaused ? 'Reanudar' : 'Pausar'}
      </Button>
      
      <Button
        onClick={onResetGraph}
        disabled={!isPlaying || isPaused || isGameOver}
        variant="warning"
        size="md"
        icon={<RotateCcw className="w-5 h-5" />}
        className="w-full"
      >
        Limpiar Progreso
      </Button>
      
      <Button
        onClick={onToggleSound}
        variant="primary"
        size="md"
        icon={soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        className="w-full"
      >
        Sonido: {soundEnabled ? 'ON' : 'OFF'}
      </Button>
    </div>
  );
}