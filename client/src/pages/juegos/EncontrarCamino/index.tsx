import { GameHeader } from "./componentes/GameHeader";
import { GraphCanvas } from "./componentes/GraphCanvas";
import { GameControls } from "./componentes/GameControls";
import { GameInfo } from "./componentes/GameInfo";

export default function EncontrarCamino() {
    return (
        <div className="min-h-screen bg-black text-white p-4">
            {/* header */}
            <div className="max-w-6xl mx-auto mb-6">
                <GameHeader />
            </div>
            {/* campo de juego */}
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* canvas */}
                    <div className="lg:col-span-3">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border relative overflow-hidden">
                            {/* animación de exito */}

                            {/* pantalla de inicio */}

                            {/* pantalla de Game Over */}

                            {/* pantalla de pausa */}

                            {/* canvas */}
                            <GraphCanvas />
                        </div>
                    </div>
                    {/* componentes laterales */}
                    <div className="space-y-6">
                        {/* opciones de juego */}
                        <GameControls />
                        {/* info del juego */}
                        <GameInfo />
                    </div>
                </div>
            </div>
        </div>
    );
}
