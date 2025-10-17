// panel de información e instrucciones del juego

import { Info } from 'lucide-react';
import { GAME_CONFIG } from '../utils/nivelConfig';

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
                    <span>Se te asignarán dos nodos al azar: un inicio y un destino.</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Tu objetivo es encontrar el camino más corto entre ambos, medido en cantidad de aristas (no hay pesos).</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Haz clic en los nodos para avanzar, o pasa el cursor por encima de los nodos adyacentes para “dibujar” tu camino.</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">•</span>
                    <span>Ganas +{GAME_CONFIG.timeBonus}s por cada camino más corto encontrado.</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span>Los caminos incorrectos o ciclos innecesarios restan puntos o rompen tu combo.</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span>Puedes pausar el juego solo {GAME_CONFIG.maxPauses} veces por partida.</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span>Puedes reiniciar el intento, pero perderás el combo acumulado.</span>
                </li>
            </ul>

            <div className="mt-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                <div className="text-xs text-purple-300 font-semibold mb-1">💡 Consejos:</div>
                <ul className="text-sm text-slate-300 space-y-2" >
                    <li className="flex items-start gap-2" >
                        <span className="text-yellow-400">•</span>
                        <span className='text-xs' >Pasa el cursor sobre un nodo para ver cuáles son adyacentes y planifica tu siguiente movimiento.</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}