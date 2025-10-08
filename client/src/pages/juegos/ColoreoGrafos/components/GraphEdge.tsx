// componente de arista del grafo

import type { BaseEdge } from '../../../../types/graph.types';
import type { ColoredNode } from '../types';
import { COLORS } from '../../../../utils/constants';

export interface GraphEdgeProps {
  edge: BaseEdge;
  fromNode: ColoredNode;
  toNode: ColoredNode;
  isHighlighted: boolean;
}

export function GraphEdge({ edge, fromNode, toNode, isHighlighted }: GraphEdgeProps) {
  const strokeColor = isHighlighted ? COLORS.GRAPH.EDGE_HIGHLIGHT : COLORS.GRAPH.EDGE_DEFAULT;
  const strokeWidth = isHighlighted ? 4 : 2;

  return (
    <line
      x1={fromNode.x}
      y1={fromNode.y}
      x2={toNode.x}
      y2={toNode.y}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      className="transition-all duration-200"
    />
  );
}