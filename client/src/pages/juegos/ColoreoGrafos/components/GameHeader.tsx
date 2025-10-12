// cabecera del juego con estadísticas

import { Zap, Target } from 'lucide-react';
import { Timer } from '../../../../components/ui/Timer';
import { ScoreDisplay } from '../../../../components/common/ScoreDisplay';

export interface GameHeaderProps {
  level: number;
  score: number;
  highScore: number;
  timeRemaining?: number;
  combo: number;
  isPlaying: boolean;
}

export function GameHeader({
  level,
  score,
  highScore,
  timeRemaining= 60,
  combo,
  isPlaying
}: GameHeaderProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-100 to-slate-300/50 bg-clip-text text-transparent">
            Coloreo de Grafos
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            ¡Colorea el grafo sin que nodos adyacentes tengan el mismo color!
          </p>
        </div>

        <div className="flex gap-6 items-center">
          {
            timeRemaining > 0 && isPlaying && (
              <div className="text-center">
                <div className="text-sm text-slate-300 flex items-center justify-center gap-1 font-bold">
                  <Target className="w-4 h-4" />
                  Nivel
                </div>
                <div className="text-2xl font-bold text-white">{level}</div>
              </div>
            )
          }
          {
            timeRemaining > 0 && isPlaying && (
              <ScoreDisplay score={score} label="Puntos" color="text-white" className='font-bold' />
            )
          }
          
          <ScoreDisplay
            score={highScore}
            label="Record"
            icon="trophy"
            color="text-yellow-400"
            className='font-bold'
          />
          {
            isPlaying && timeRemaining > 0 && (
              <Timer timeRemaining={timeRemaining} showMilliseconds={true} className='font-bold' />
            )
          }
          
        </div>
      </div>

      {combo > 0 && timeRemaining > 0 && isPlaying &&(
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/30 px-4 py-2 rounded-full animate-pulse border border-orange-400/50">
            <Zap className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-bold">
              ¡Combo x{combo}! (+{Math.floor(combo * 50)} puntos bonus)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}