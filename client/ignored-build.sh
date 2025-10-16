#!/bin/bash

# umbral mínimo de líneas cambiadas para hacer deploy
THRESHOLD=150
echo "Numero minimo de lineas cambiadas en archivos importantes de /client para cancelar el build-deploy: $THRESHOLD"
# obtener lista de archivos modificados entre el último deploy y el commit actual
changed_files=$(git diff --name-only $VERCEL_GIT_PREVIOUS_SHA $VERCEL_GIT_COMMIT_SHA)
# filtrar solo archivos en src/ o public/
relevant_files=$(echo "$changed_files" | grep -E '^(src/|public/)')
# si no hay archivos relevantes, ignorar build
if [ -z "$relevant_files" ]; then
  echo "No relevant changes in src/ or public/, skipping build."
  exit 0
fi
# contar líneas modificadas en archivos relevantes
lines_changed=$(git diff --shortstat $VERCEL_GIT_PREVIOUS_SHA $VERCEL_GIT_COMMIT_SHA -- $relevant_files | awk '{added+=$4; removed+=$6} END {print added+removed}')
# Si no se pudo calcular, considerar 0
lines_changed=${lines_changed:-0}
# comparar con el umbral
if [ "$lines_changed" -ge "$THRESHOLD" ]; then
  echo "Detected $lines_changed lines changed in src/ or public/. Triggering build."
  exit 1  # hacer build
else
  echo "Only $lines_changed lines changed in src/ or public/. Skipping build."
  exit 0  # ignorar build
fi
