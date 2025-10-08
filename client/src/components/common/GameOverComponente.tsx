// pantalla de Game Over reutilizable

import { RotateCcw, Home } from 'lucide-react';
import { Button } from '../ui/Button';

export interface GameOverInterface {
  score: number;
  highScore: number;
  isNewRecord?: boolean;
  stats?: Array<{ label: string; value: string | number }>;
  onRestart: () => void;
  onHome?: () => void;
  title?: string;
  message?: string;
}

export function GameOverComponente({
  score,
  highScore,
  isNewRecord = false,
  stats = [],
  onRestart,
  onHome,
  title = '¡Juego Terminado!',
  message,
}: GameOverInterface) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 bg-slate-900/95 backdrop-blur-sm">
      <div className="text-center max-w-md p-8">
        <h2 className="text-4xl font-bold mb-4 text-red-400">{title}</h2>
        
        {message && (
          <p className="text-xl text-slate-300 mb-6">{message}</p>
        )}
        
        <div className="bg-slate-800 rounded-2xl p-6 mb-6 border">
          <div className="text-6xl font-bold mb-2">
            {score.toLocaleString()}
          </div>
          <div className="text-xl text-slate-300 mb-4">Puntos Finales</div>
          
          {isNewRecord && (
            <div className="text-yellow-400 font-bold text-xl mb-4 animate-pulse">
              ¡Nuevo Record! 🏆
            </div>
          )}
          
          <div className="text-slate-400 text-sm font-bold">
            Record histórico: <span className="text-yellow-400 font-bold">{highScore.toLocaleString()}</span>
          </div>
        </div>
        
        {stats.length > 0 && (
          <div className="bg-slate-800 rounded-xl p-4 mb-6 border">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex flex-col gap-3">
          <Button
            variant="success"
            size="lg"
            icon={<RotateCcw className="w-6 h-6" />}
            onClick={onRestart}
          >
            Jugar de Nuevo
          </Button>
          
          {onHome && (
            <Button
              variant="secondary"
              size="md"
              icon={<Home className="w-5 h-5" />}
              onClick={onHome}
            >
              Volver al Menú
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}