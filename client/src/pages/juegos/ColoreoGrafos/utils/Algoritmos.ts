// Algoritmos específicos para coloreo de grafos

import type { ColorGraph, ColoredNode } from '../types';

//verifica si un grafo está correctamente coloreado
export function isValidColoring(graph: ColorGraph): boolean {
  // Todos los nodos deben estar coloreados
  const allNodesColored = graph.nodes.every(node => node.color !== null);
  if (!allNodesColored) return false;
  // ningún par de nodos adyacentes puede tener el mismo color
  for (const node of graph.nodes) {
    for (const neighborId of node.neighbors) {
      const neighbor = graph.nodes.find(n => n.id === neighborId);
      if (neighbor && node.color === neighbor.color) {
        return false;
      }
    }
  }
  return true;
}

// Verifica si un nodo específico puede ser coloreado con un color dado
export function canColorNode(
  node: ColoredNode,
  color: string,
  graph: ColorGraph
): boolean {
  for (const neighborId of node.neighbors) {
    const neighbor = graph.nodes.find(n => n.id === neighborId);
    if (neighbor && neighbor.color === color) {
      return false;
    }
  }
  return true;
}

// obtiene los colores disponibles para un nodo
export function getAvailableColors(
  node: ColoredNode,
  graph: ColorGraph,
  allColors: string[]
): string[] {
  const usedColors = new Set<string>();
  for (const neighborId of node.neighbors) {
    const neighbor = graph.nodes.find(n => n.id === neighborId);
    if (neighbor && neighbor.color) {
      usedColors.add(neighbor.color);
    }
  }
  return allColors.filter(color => !usedColors.has(color));
}

// estima el número cromático del grafo (cota inferior)
export function estimateChromaticNumber(graph: ColorGraph): number {
  // el número cromático es al menos el tamaño del mayor clique
  // también es al menos (grado máximo + 1)
  const maxDegree = Math.max(...graph.nodes.map(n => n.neighbors.length));
  return maxDegree + 1;
}

// Verifica si hay conflictos en el coloreo actual
export function hasConflicts(graph: ColorGraph): ColoredNode[] {
  const conflictNodes: ColoredNode[] = [];
  for (const node of graph.nodes) {
    if (!node.color) continue;
    for (const neighborId of node.neighbors) {
      const neighbor = graph.nodes.find(n => n.id === neighborId);
      if (neighbor && neighbor.color === node.color) {
        if (!conflictNodes.find(n => n.id === node.id)) {
          conflictNodes.push(node);
        }
        break;
      }
    }
  }
  return conflictNodes;
}