#!/bin/bash

# umbral mínimo de líneas cambiadas para hacer deploy
THRESHOLD=100
echo "Numero minimo de lineas cambiadas en archivos importantes de /client para cancelar el build-deploy: $THRESHOLD"
echo "Commit anterior: $VERCEL_GIT_PREVIOUS_SHA"
echo "Commit actual:   $VERCEL_GIT_COMMIT_SHA"

echo "Archivos modificados detectados:"
git diff --name-only $VERCEL_GIT_PREVIOUS_SHA $VERCEL_GIT_COMMIT_SHA || echo "No se pudo comparar commits"

# obtener lista de archivos modificados entre el último deploy y el commit actual
changed_files=$(git diff --name-only $VERCEL_GIT_PREVIOUS_SHA $VERCEL_GIT_COMMIT_SHA)

# filtrar solo archivos en src/ o public/ (considerando que estás en /client)
relevant_files=$(echo "$changed_files" | grep -E '(^src/|^public/|^client/src/|^client/public/)')

# si no hay archivos relevantes, ignorar build
if [ -z "$relevant_files" ]; then
  echo "No relevant changes in src/ or public/, skipping build."
  exit 0
fi

echo "Archivos relevantes detectados:"
echo "$relevant_files"

# contar líneas modificadas usando --numstat (más confiable)
lines_changed=0
while IFS= read -r file; do
  if [ -n "$file" ]; then
    echo "Procesando archivo: $file"
    
    # intentar sin el prefijo client/ si estamos en el directorio client
    file_to_check="$file"
    if [[ "$file" == client/* ]] && [ -f "${file#client/}" ]; then
      file_to_check="${file#client/}"
      echo "  Ajustando ruta a: $file_to_check"
    fi
    
    # --numstat devuelve: added removed filename
    stats=$(git diff --numstat $VERCEL_GIT_PREVIOUS_SHA $VERCEL_GIT_COMMIT_SHA -- "$file_to_check" 2>&1)
    echo "  Stats devueltos: '$stats'"
    
    if [ -n "$stats" ]; then
      added=$(echo "$stats" | awk '{print $1}')
      removed=$(echo "$stats" | awk '{print $2}')
      # manejar archivos binarios (mostrarían "-")
      if [ "$added" != "-" ] && [ "$removed" != "-" ] && [ -n "$added" ] && [ -n "$removed" ]; then
        file_total=$((added + removed))
        lines_changed=$((lines_changed + file_total))
        echo "  $file: +$added -$removed (total: $file_total)"
      else
        echo "  Archivo ignorado (binario o sin datos válidos)"
      fi
    else
      echo "  No se obtuvieron stats para este archivo"
    fi
  fi
done <<< "$relevant_files"

echo "Total de líneas cambiadas: $lines_changed"

# comparar con el umbral
if [ "$lines_changed" -ge "$THRESHOLD" ]; then
  echo "Detected $lines_changed lines changed in src/ or public/. Triggering build."
  exit 1  # hacer build
else
  echo "Only $lines_changed lines changed in src/ or public/. Skipping build."
  exit 0  # ignorar build
fi