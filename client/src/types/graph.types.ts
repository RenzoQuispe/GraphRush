// tipos base que en principio se planea que todos los juegos de grafos usarán

export interface BaseNode {
  id: string;
  x: number;
  y: number;
  label?: string;
}

export interface BaseEdge {
  from: string;
  to: string;
  weight?: number;
}

export interface BaseGraph {
  nodes: BaseNode[];
  edges: BaseEdge[];
}

export interface GraphPosition {
  x: number;
  y: number;
}

export interface GraphDimensions {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  radius: number;
}