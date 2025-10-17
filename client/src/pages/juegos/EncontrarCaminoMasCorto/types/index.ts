export interface EncontrarCaminoGameState {
    timeRemaining: number;
    isPlaying: boolean;
    isPaused: boolean;
    isGameOver: boolean;
    currentLevel: number;
    score: number;
    graphsCompleted: number;
    combo: number;
    bestCombo: number;
    showSuccess: boolean;
    highScore: number;
    pausesRemaining: number;
}

export interface EncontrarCaminoGameConfig {
    initialTime: number;
    timeBonus: number;
    pointsPerGraph: number;
    comboMultiplier: number;
    maxPauses: number;
}