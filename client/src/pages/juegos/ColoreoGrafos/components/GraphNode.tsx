// componente de nodo individual del grafo

import type { ColoredNode } from '../types';
import { COLORS } from '../../../../utils/constants';

export interface GraphNodeProps {
  node: ColoredNode;
  isHovered: boolean;
  onHover: (nodeId: string | null) => void;
  onClick: (nodeId: string) => void;
}

export function GraphNode({ node, isHovered, onHover, onClick }: GraphNodeProps) {
  const radius = isHovered ? 38 : 34;
  const strokeColor = isHovered ? COLORS.GRAPH.NODE_STROKE_HOVER : COLORS.GRAPH.NODE_STROKE;
  const strokeWidth = isHovered ? 4 : 3;

  return (
    <g>
      <circle
        cx={node.x}
        cy={node.y}
        r={radius}
        fill={node.color || COLORS.GRAPH.NODE_DEFAULT}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        className="cursor-pointer transition-all duration-200"
        style={{
          filter: isHovered ? 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.8))' : 'none',
        }}
        onMouseEnter={() => onHover(node.id)}
        onMouseLeave={() => onHover(null)}
        onClick={() => onClick(node.id)}
      />
      <text
        x={node.x}
        y={node.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="24"
        fontWeight="bold"
        className="pointer-events-none select-none"
      >
        {node.label || node.id.split('-')[1]}
      </text>
    </g>
  );
}