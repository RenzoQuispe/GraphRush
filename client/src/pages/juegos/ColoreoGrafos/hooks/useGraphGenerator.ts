// hook para generar grafos coloreables

import { useCallback } from 'react';
import type { ColorGraph, ColoredNode } from '../types';
import { getLevelConfig } from '../utils/nivelConfig';
import {
  generateCircularNodes,
  generateRandomEdges,
  getNodeNeighbors,
  getMaxDegree,
  DEFAULT_DIMENSIONS,
} from '../../../../utils/graph/graphGenerator';
import type { BaseGraph } from '../../../../types/graph.types';

export interface GenerateGraphResult {
  graph: ColorGraph;
  colorLimit: number;
}

export function useGraphGenerator() {
  const generateGraph = useCallback((level: number): GenerateGraphResult => {
    const config = getLevelConfig(level);
    const nodeCount = config.minNodes + Math.floor(Math.random() * (config.maxNodes - config.minNodes + 1));
    // generar grafo base
    const baseNodes = generateCircularNodes(nodeCount, DEFAULT_DIMENSIONS);
    const edges = generateRandomEdges(baseNodes, config.edgeProbability);
    // convertir a ColorGraph
    const coloredNodes: ColoredNode[] = baseNodes.map(node => ({
      ...node,
      color: null,
      neighbors: getNodeNeighbors(node.id, edges),
    }));
    const graph: ColorGraph = {
      nodes: coloredNodes,
      edges,
    };
    // calcular límite de colores basado en el grado máximo
    const baseGraph: BaseGraph = { nodes: baseNodes, edges };
    const maxDegree = getMaxDegree(baseGraph);
    const colorLimit = Math.min(Math.max(3, maxDegree + 1), config.colorLimit);
    return { graph, colorLimit };
  }, []);
  return { generateGraph };
}