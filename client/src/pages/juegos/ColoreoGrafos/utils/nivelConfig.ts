// configuración de niveles y dificultad

import type { ColorGameConfig } from '../types/index.ts';

export const GAME_CONFIG: ColorGameConfig = {
  initialTime: 60,
  timeBonus: 3,
  pointsPerGraph: 100,
  comboMultiplier: 1.5,
  maxColors: 8,
};

export interface LevelConfig {
  minNodes: number;
  maxNodes: number;
  edgeProbability: number;
  colorLimit: number;
}

// calcula la configuración del nivel basado en el número de nivel
export function getLevelConfig(level: number): LevelConfig {
  // aumentamos gradualmente la complejidad
  const baseNodes = Math.min(4 + Math.floor(level / 2), 12);
  const nodeVariation = Math.min(Math.floor(level / 3), 3);
  return {
    minNodes: baseNodes,
    maxNodes: baseNodes + nodeVariation,
    edgeProbability: Math.min(0.3 + level * 0.02, 0.6),
    colorLimit: 0, // se calcula en utils/graph/graphGenerator.ts
  };
}

// calcula los puntos basados en nivel y combo
export function calculatePoints(level: number, combo: number): number {
  const basePoints = GAME_CONFIG.pointsPerGraph;
  const levelBonus = level * 10;
  const comboBonus = combo > 0 ? Math.floor(basePoints * GAME_CONFIG.comboMultiplier) : 0;
  return basePoints + levelBonus + comboBonus;
}