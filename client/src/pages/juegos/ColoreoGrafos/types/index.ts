// tipos específicos del juego Coloreo de Grafos

import type { BaseNode, BaseGraph, BaseEdge } from "../../../../types/graph.types";

export interface ColoredNode extends BaseNode {
  color: string | null;
  neighbors: string[];
}

export interface ColorGraph extends BaseGraph {
  nodes: ColoredNode[];
  edges: BaseEdge[];
}

export interface ColorGameState {
  timeRemaining: number;
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  currentLevel: number;
  score: number;
  graphsCompleted: number;
  graph: ColorGraph;
  colorLimit: number;
  selectedColor: string;
  combo: number;
  showSuccess: boolean;
  highScore: number;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
}

export interface ColorGameConfig {
  initialTime: number;
  timeBonus: number;
  pointsPerGraph: number;
  comboMultiplier: number;
  maxColors: number;
}