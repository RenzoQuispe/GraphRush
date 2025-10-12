// Generador de grafos base reutilizable

import type { BaseGraph, BaseNode, BaseEdge, GraphDimensions } from '../../types/graph.types.ts';

export interface GraphGeneratorConfig {
  minNodes: number;
  maxNodes: number;
  edgeProbability: number;
  dimensions: GraphDimensions;
}

export const DEFAULT_DIMENSIONS: GraphDimensions = {
  width: 800,
  height: 600,
  centerX: 400,
  centerY: 300,
  radius: 210,
};

// Genera nodos en disposición circular

export function generateCircularNodes(
  count: number,
  dimensions: GraphDimensions = DEFAULT_DIMENSIONS
): BaseNode[] {
  const nodes: BaseNode[] = [];
  const { centerX, centerY, radius } = dimensions;

  for (let i = 0; i < count; i++) {
    const angle = (2 * Math.PI * i) / count;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    nodes.push({
      id: `node-${i}`,
      x,
      y,
      label: i.toString(),
    });
  }

  return nodes;
}

// Genera aristas aleatorias entre nodos

export function generateRandomEdges(
  nodes: BaseNode[],
  probability: number = 0.3
): BaseEdge[] {
  const edges: BaseEdge[] = [];
  const nodeCount = nodes.length;
  // asegurar grafo conexo, crear ciclo básico
  for (let i = 0; i < nodeCount; i++) {
    const from = nodes[i].id;
    const to = nodes[(i + 1) % nodeCount].id;
    edges.push({ from, to });
  }
  // agregar aristas adicionales aleatorias
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 2; j < nodeCount; j++) {
      if (Math.random() < probability) {
        const from = nodes[i].id;
        const to = nodes[j].id;
        // evitar duplicados
        const exists = edges.some(
          e => (e.from === from && e.to === to) || (e.from === to && e.to === from)
        );
        
        if (!exists) {
          edges.push({ from, to });
        }
      }
    }
  }

  return edges;
}

//Genera un grafo aleatorio conexo

export function generateRandomGraph(
  nodeCount: number,
  config?: Partial<GraphGeneratorConfig>
): BaseGraph {
  const dimensions = config?.dimensions || DEFAULT_DIMENSIONS;
  const edgeProbability = config?.edgeProbability || 0.3;

  const nodes = generateCircularNodes(nodeCount, dimensions);
  const edges = generateRandomEdges(nodes, edgeProbability);

  return { nodes, edges };
}

// Calcula el grado máximo de un grafo

export function getMaxDegree(graph: BaseGraph): number {
  const degrees = new Map<string, number>();
  // inicializar grados
  graph.nodes.forEach(node => degrees.set(node.id, 0));
  // contar grados
  graph.edges.forEach(edge => {
    degrees.set(edge.from, (degrees.get(edge.from) || 0) + 1);
    degrees.set(edge.to, (degrees.get(edge.to) || 0) + 1);
  });
  return Math.max(...Array.from(degrees.values()));
}

// Obtiene los vecinos de un nodo dado

export function getNodeNeighbors(nodeId: string, edges: BaseEdge[]): string[] {
  const neighbors: string[] = [];

  edges.forEach(edge => {
    if (edge.from === nodeId) {
      neighbors.push(edge.to);
    } else if (edge.to === nodeId) {
      neighbors.push(edge.from);
    }
  });

  return neighbors;
}

// calcula el número cromático exacto de un grafo mediante backtracking
export function getNumeroCromaticoExacto(graph: BaseGraph): number {
  const nodes = graph.nodes.map(n => n.id);
  const edges = graph.edges;
  const n = nodes.length;
  // mapa rápido de vecinos
  const neighbors = new Map<string, string[]>();
  nodes.forEach(id => neighbors.set(id, getNodeNeighbors(id, edges)));
  // asignación de colores (índice de color o null)
  const colors = new Map<string, number>();
  let best = n; // peor caso: todos los vértices distintos
  function canColor(nodeId: string, color: number): boolean {
    const adj = neighbors.get(nodeId)!;
    return adj.every(nid => colors.get(nid) !== color);
  }
  function backtrack(index: number, usedColors: number) {
    // poda: si ya usamos más colores que el mejor encontrado
    if (usedColors >= best) return;
    if (index === n) {
      // todos coloreados -> actualizar mejor resultado
      best = Math.min(best, usedColors);
      return;
    }
    const nodeId = nodes[index];
    // intentar colores existentes primero
    for (let c = 0; c < usedColors; c++) {
      if (canColor(nodeId, c)) {
        colors.set(nodeId, c);
        backtrack(index + 1, usedColors);
        colors.delete(nodeId);
      }
    }
    // probar un nuevo color
    colors.set(nodeId, usedColors);
    backtrack(index + 1, usedColors + 1);
    colors.delete(nodeId);
  }
  backtrack(0, 0);
  return best;
}