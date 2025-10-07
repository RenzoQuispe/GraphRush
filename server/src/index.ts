import app from "./app.js";

const PORT = 3001;

async function main() {
  try {
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" Error al conectar a la base de datos:", error);
    process.exit(1);
  }
}

main();