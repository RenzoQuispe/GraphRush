export function GameHeader() {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-100 to-slate-300/50 bg-clip-text text-transparent">
                        Encontrar Camino Más corto
                    </h1>
                </div>
            </div>
        </div>
    );
}