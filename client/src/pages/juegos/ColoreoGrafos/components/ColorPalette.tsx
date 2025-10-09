// selector de colores para colorear el grafo

import { useEffect, useRef } from 'react';
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
  const selectedIndexRef = useRef(0);
  // actualizar el índice cuando cambia el color seleccionado
  useEffect(() => {
    const index = availableColors.findIndex(c => c === selectedColor);
    if (index !== -1) {
      selectedIndexRef.current = index;
    }
  }, [selectedColor, availableColors]);
  // manejar controles de teclado
  useEffect(() => {
    if (disabled) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      // solo actuar si es W, A, S, D
      if (!['w', 'a', 's', 'd'].includes(key)) return;
      e.preventDefault(); // prevenir scroll de página
      const currentIndex = selectedIndexRef.current;
      const cols = 2; // grid de 2 columnas
      const rows = Math.ceil(availableColors.length / cols);
      let newIndex = currentIndex;
      switch (key) {
        case 'w': // Arriba
          newIndex = currentIndex - cols;
          if (newIndex < 0) {
            // ir a la última fila de la misma columna
            const col = currentIndex % cols;
            newIndex = (rows - 1) * cols + col;
            if (newIndex >= availableColors.length) {
              newIndex -= cols;
            }
          }
          break;
        case 's': // Abajo
          newIndex = currentIndex + cols;
          if (newIndex >= availableColors.length) {
            // ir a la primera fila de la misma columna
            newIndex = currentIndex % cols;
          }
          break;
        case 'a': // Izquierda
          newIndex = currentIndex - 1;
          if (newIndex < 0) {
            // ir al último color
            newIndex = availableColors.length - 1;
          }
          break;
        case 'd': // Derecha
          newIndex = currentIndex + 1;
          if (newIndex >= availableColors.length) {
            // ir al primer color
            newIndex = 0;
          }
          break;
      }
      // actualizar selección
      selectedIndexRef.current = newIndex;
      onSelectColor(availableColors[newIndex]);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [availableColors, onSelectColor, disabled]);

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