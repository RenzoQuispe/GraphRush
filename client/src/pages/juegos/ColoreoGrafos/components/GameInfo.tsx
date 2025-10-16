// panel de información e instrucciones del juego

import { Info } from 'lucide-react';
import { GAME_CONFIG, MAX_PAUSES } from '../utils/nivelConfig';

export interface GameInfoProps {
  className?: string;
}

export function GameInfo({ className = '' }: GameInfoProps) {
  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-5 h-5" />
        <h3 className="text-lg font-bold">Instrucciones</h3>
      </div>

      <ul className="text-sm text-slate-300 space-y-2">
        <li className="flex items-start gap-2">
          <span className="text-purple-400 font-bold">•</span>
          <span>Click en un nodo para colorearlo con el color seleccionado.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-purple-400 font-bold">•</span>
          <span>Nodos adyacentes NO pueden tener el mismo color.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-purple-400 font-bold">•</span>
          <span>Colorea correctamente todo el grafo para pasar al siguiente grafo.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-400 font-bold">•</span>
          <span>Ganas +{GAME_CONFIG.timeBonus}s por cada grafo completado.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-orange-400 font-bold">•</span>
          <span>¡Haz combos consecutivos para multiplicar tus puntos!</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-red-400 font-bold">•</span>
          <span>Puedes pausar el juego solo {MAX_PAUSES} veces por partida.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-red-400 font-bold">•</span>
          <span>Si limpias el grafo actual, pierdes tu combo acumulado. </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-red-400 font-bold">•</span>
          <span>Colorear un nodo con el mismo color que uno de sus adyacentes también rompe tu combo. </span>
        </li>
      </ul>

      <div className="mt-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
        <div className="text-xs text-purple-300 font-semibold mb-1">💡 Consejos:</div>
        <ul className="text-sm text-slate-300 space-y-2" >
          <li className="flex items-start gap-2" >
            <span className="text-yellow-400">•</span>
            <span className='text-xs' >Pasa el cursor sobre un nodo para ver resaltadas sus conexiones.</span>
          </li>
          <li className="flex items-start gap-2" >
            <span className="text-yellow-400">•</span>
            <span className='text-xs'>Usa las teclas W-A-S-D cambiar más rápido el color seleccionado.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}