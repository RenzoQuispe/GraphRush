import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">404 - Página no encontrada</h1>
      <Link to="/" className="text-blue-500 hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}
