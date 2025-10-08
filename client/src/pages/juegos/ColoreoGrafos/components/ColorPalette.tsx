// selector de colores para colorear el grafo

import { COLORS } from '../../../../utils/constants';

export interface ColorPaletteProps {
  selectedColor: string;
  colorLimit: number;
  onSelectColor: (color: string) => void;
  disabled?: boolean;
}

export function ColorPalette({
  selectedColor,
  colorLimit,
  onSelectColor,
  disabled = false,
}: ColorPaletteProps) {
  const availableColors = COLORS.PALETTE.slice(0, colorLimit);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border">
      <h3 className="text-lg font-bold mb-4">
        Colores (máximo {colorLimit})
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {availableColors.map(color => (
          <button
            key={color}
            onClick={() => !disabled && onSelectColor(color)}
            disabled={disabled}
            className={`h-16 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedColor === color 
                ? 'ring-4 ring-white scale-105' 
                : 'hover:ring-2 hover:ring-white/50'
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Seleccionar color ${color}`}
          />
        ))}
      </div> 
    </div>
  );
}