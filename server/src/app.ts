import express, { type Application, type Request, type Response } from "express";
import cors, { type CorsOptions } from "cors";
import morgan from "morgan";

const app: Application = express();

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (origin.includes("http://localhost")) return callback(null, true);
    // Permitir toda la red local 192.168.1.x
    if (/^http:\/\/192\.168\.1\.\d+(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    // Rechazar cualquier otro origen
    callback(new Error("No permitido por CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "GraphGames API" });
});

export default app;