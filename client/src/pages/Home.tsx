import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="text-center">
            <h1 className="p-5 text-center font-bold text-3xl">
                GraphRush
            </h1>
            <p>
                Modos de juego listos para jugar:
            </p>
            <Link
                to="/juegos/coloreo-grafos"
                className="text-blue-400 hover:text-blue-600 underline"
            >
                Colorear Grafos
            </Link>
            <p>
                Modos de juego en construcción:
            </p>
            <Link
                to="/juegos/encontrar-camino-mas-corto"
                className="text-blue-400 hover:text-blue-600 underline"
            >
                Encontrar Camino Más Corto
            </Link>
            <br />
            <Link
                to="/juegos/encontrar-camino"
                className="text-blue-400 hover:text-blue-600 underline"
            >
                Encontrar Camino
            </Link>
            <br />
            <Link
                to="/juegos/ciclo-hamiltoniano"
                className="text-blue-400 hover:text-blue-600 underline"
            >
                Ciclo Hamiltoniano
            </Link>
        </div>
    );
}
