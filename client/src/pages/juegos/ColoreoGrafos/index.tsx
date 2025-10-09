// componente principal del juego Coloreo de Grafos

import { Play } from 'lucide-react';
import { useGraphGame } from './hooks/useGraphGame';
import { GameHeader } from './components/GameHeader';
import { GraphCanvas } from './components/GraphCanvas';
import { ColorPalette } from './components/ColorPalette';
import { GameControls } from './components/GameControls';
import { GameInfo } from './components/GameInfo';
import { Button } from '../../../components/ui/Button';
import { GameOverComponente } from '../../../components/common/GameOverComponente';

export default function ColoreoGrafosGame() {
  const {
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
  } = useGraphGame();

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* header */}
      <div className="max-w-6xl mx-auto mb-6">
        <GameHeader
          level={gameState.currentLevel}
          score={gameState.score}
          highScore={gameState.highScore}
          timeRemaining={gameState.timeRemaining}
          combo={gameState.combo}
        />
      </div>
      
      {/* campo de juego */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* canvas */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border relative overflow-hidden">
              {/* exito */}
              {gameState.showSuccess && (
                <div className="absolute inset-0 bg-green-500/20 animate-pulse z-10 pointer-events-none" />
              )}
              
              {/* pantalla de inicio */}
              {!gameState.isPlaying && !gameState.isGameOver && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-slate-900/80 backdrop-blur-sm">
                  <Button
                    onClick={startGame}
                    variant="success"
                    size="lg"
                    icon={<Play className="w-6 h-6" />}
                  >
                    Iniciar Juego
                  </Button>
                </div>
              )}
              
              {/* pantalla de Game Over */}
              {gameState.isGameOver && (
                <GameOverComponente
                  score={gameState.score}
                  highScore={gameState.highScore}
                  isNewRecord={gameState.score > gameState.highScore}
                  stats={[
                    { label: 'Nivel Alcanzado', value: gameState.currentLevel },
                    { label: 'Grafos Completados', value: gameState.graphsCompleted },
                    { label: 'Mejor Combo', value: `x${gameState.combo}` },
                  ]}
                  onRestart={startGame}
                  title="¡Tiempo Agotado!"
                />
              )}
              
              {/* pantalla de pausa */}
              {gameState.isPaused && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-slate-900/80 backdrop-blur-sm">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold mb-6">Pausa</h2>
                    <Button
                      onClick={togglePause}
                      variant="secondary"
                      size="lg"
                      icon={<Play className="w-6 h-6" />}
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              )}
              
              {/* canvas */}
              <GraphCanvas
                graph={gameState.graph}
                hoveredNode={hoveredNode}
                particles={particles}
                onNodeHover={setHoveredNode}
                onNodeClick={colorNode}
              />
            </div>
          </div>
          
          {/* componentes laterales */}
          <div className="space-y-6">
            {/* escoger colores */}
            <ColorPalette
              selectedColor={gameState.selectedColor}
              colorLimit={gameState.colorLimit}
              onSelectColor={selectColor}
              disabled={!gameState.isPlaying || gameState.isPaused || gameState.isGameOver}
            />
            
            {/* opciones de juego */}
            <GameControls
              isPlaying={gameState.isPlaying}
              isPaused={gameState.isPaused}
              isGameOver={gameState.isGameOver}
              soundEnabled={soundEnabled}
              onTogglePause={togglePause}
              onResetGraph={resetGraph}
              onToggleSound={toggleSound}
            />
            
            {/* info del juego */}
            <GameInfo />
          </div>
        </div>
      </div>
    </div>
  );
}