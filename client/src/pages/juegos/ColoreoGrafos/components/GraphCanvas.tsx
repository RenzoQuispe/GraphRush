// canvas principal para renderizar el grafo

import type { ColorGraph, Particle } from '../types';
import { GraphNode } from './GraphNode';
import { GraphEdge } from './GraphEdge';

export interface GraphCanvasProps {
  graph: ColorGraph;
  hoveredNode: string | null;
  particles: Particle[];
  onNodeHover: (nodeId: string | null) => void;
  onNodeClick: (nodeId: string) => void;
  width?: number;
  height?: number;
}

export function GraphCanvas({
  graph,
  hoveredNode,
  particles,
  onNodeHover,
  onNodeClick,
  width = 800,
  height = 600,
}: GraphCanvasProps) {
  return (
    <svg width={width} height={height} className="mx-auto">
      {/* renderizar aristas */}
      {graph.edges.map((edge, i) => {
        const fromNode = graph.nodes.find(n => n.id === edge.from);
        const toNode = graph.nodes.find(n => n.id === edge.to);
        
        if (!fromNode || !toNode) return null;
        
        const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to;
        
        return (
          <GraphEdge
            key={i}
            edge={edge}
            fromNode={fromNode}
            toNode={toNode}
            isHighlighted={isHighlighted}
          />
        );
      })}
      
      {/* renderizar nodos */}
      {graph.nodes.map((node) => (
        <GraphNode
          key={node.id}
          node={node}
          isHovered={hoveredNode === node.id}
          onHover={onNodeHover}
          onClick={onNodeClick}
        />
      ))}
      
      {/* renderizar efecto de exito */}
      {particles.map(particle => (
        <g key={particle.id} className="animate-ping">
          <circle cx={particle.x} cy={particle.y} r="30" fill="#22c55e" opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}