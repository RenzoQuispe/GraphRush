// Lógica principal del juego de coloreo de grafos

import { useState, useCallback, useEffect } from 'react';
import type { ColorGameState, Particle } from '../types';
import { useGraphGenerator } from './useGraphGenerator';
import { GAME_CONFIG, calculatePoints } from '../utils/nivelConfig';
import { useTimer } from '../../../../hooks/useTimer';
import { isValidColoring } from '../utils/Algoritmos';
import { useSound } from '../../../../hooks/useSound';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { COLORS, STORAGE_KEYS } from '../../../../utils/constants';

export function useGraphGame() {
  const { generateGraph } = useGraphGenerator();
  const { play: playSound, enabled: soundEnabled, toggle: toggleSound } = useSound();
  const [highScore, setHighScore] = useLocalStorage(STORAGE_KEYS.HIGH_SCORE, 0);

  const [gameState, setGameState] = useState<ColorGameState>(() => {
    const { graph, colorLimit } = generateGraph(1);
    return {
      timeRemaining: GAME_CONFIG.initialTime,
      isPlaying: false,
      isPaused: false,
      isGameOver: false,
      currentLevel: 1,
      score: 0,
      graphsCompleted: 0,
      graph,
      colorLimit,
      selectedColor: COLORS.PALETTE[0],
      combo: 0,
      showSuccess: false,
      highScore,
    };
  });

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  // configuración del temporizador
  const timer = useTimer({
    initialTime: GAME_CONFIG.initialTime,
    onTick: (time) => {
      setGameState(prev => ({ ...prev, timeRemaining: time }));
    },
    onTimeUp: () => {
      playSound('gameover');
      setGameState(prev => {
        const newHighScore = Math.max(prev.score, prev.highScore);
        if (newHighScore > prev.highScore) {
          setHighScore(newHighScore);
        }
        return {
          ...prev,
          isGameOver: true,
          isPlaying: false,
          highScore: newHighScore,
        };
      });
    },
    onWarning: () => {
      playSound('warning');
    },
    warningThreshold: 10,
  });

  // sincronizar timer con gameState
  useEffect(() => {
    setGameState(prev => ({ ...prev, timeRemaining: timer.timeRemaining }));
  }, [timer.timeRemaining]);

  const startGame = useCallback(() => {
    const { graph, colorLimit } = generateGraph(1);
    setGameState({
      timeRemaining: GAME_CONFIG.initialTime,
      isPlaying: true,
      isPaused: false,
      isGameOver: false,
      currentLevel: 1,
      score: 0,
      graphsCompleted: 0,
      graph,
      colorLimit,
      selectedColor: COLORS.PALETTE[0],
      combo: 0,
      showSuccess: false,
      highScore,
    });
    timer.start();
  }, [generateGraph, timer, highScore]);

  const togglePause = useCallback(() => {
    if (gameState.isPaused) {
      timer.resume();
    } else {
      timer.pause();
    }
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, [gameState.isPaused, timer]);

  const colorNode = useCallback((nodeId: string) => {
    if (!gameState.isPlaying || gameState.isPaused || gameState.isGameOver) return;

    playSound('click');

    setGameState(prev => {
      const newNodes = prev.graph.nodes.map(node =>
        node.id === nodeId ? { ...node, color: prev.selectedColor } : node
      );

      const newGraph = { ...prev.graph, nodes: newNodes };

      // verificar si el grafo está completamente coloreado y es válido
      if (isValidColoring(newGraph)) {
        const node = newNodes.find(n => n.id === nodeId);
        if (node) {
          setParticles(p => [...p, { id: Date.now(), x: node.x, y: node.y }]);
          setTimeout(() => setParticles(p => p.slice(1)), 1000);
        }

        playSound('success');

        // calcular puntos con combo
        const points = calculatePoints(prev.currentLevel, prev.combo);
        const newScore = prev.score + points;
        const newCombo = prev.combo + 1;
        const newLevel = prev.currentLevel + 1;

        // mostrar animación de éxito
        setGameState(prev => ({ ...prev, showSuccess: true }));
        setTimeout(() => setGameState(prev => ({ ...prev, showSuccess: false })), 500);

        // generar siguiente grafo
        setTimeout(() => {
          const { graph: nextGraph, colorLimit: nextColorLimit } = generateGraph(newLevel);
          setGameState(prev => ({
            ...prev,
            graph: nextGraph,
            colorLimit: nextColorLimit,
            currentLevel: newLevel,
            score: newScore,
            graphsCompleted: prev.graphsCompleted + 1,
            combo: newCombo,
            selectedColor: COLORS.PALETTE[0],
          }));
          
          // agregar tiempo bonus
          timer.addTime(GAME_CONFIG.timeBonus);
        }, 600);

        return prev;
      }

      return { ...prev, graph: newGraph };
    });
  }, [gameState.isPlaying, gameState.isPaused, gameState.isGameOver, playSound, generateGraph, timer]);

  const resetGraph = useCallback(() => {
    if (!gameState.isPlaying || gameState.isPaused || gameState.isGameOver) return;

    setGameState(prev => ({
      ...prev,
      graph: {
        ...prev.graph,
        nodes: prev.graph.nodes.map(n => ({ ...n, color: null })),
      },
      combo: 0,
    }));
  }, [gameState.isPlaying, gameState.isPaused, gameState.isGameOver]);

  const selectColor = useCallback((color: string) => {
    setGameState(prev => ({ ...prev, selectedColor: color }));
  }, []);

  return {
    gameState,
    hoveredNode,
    setHoveredNode,
    particles,
    startGame,
    togglePause,
    colorNode,
    resetGraph,
    selectColor,
    soundEnabled,
    toggleSound,
  };
}