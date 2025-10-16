import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx"; 
import ColoreoGrafosGame from "./pages/juegos/ColoreoGrafos";
import EncontrarCaminoMasCortoGame from "./pages/juegos/EncontrarCaminoMasCorto";
import EncontrarCamino from "./pages/juegos/EncontrarCamino/index.tsx";
import CicloHamiltonianoGame from "./pages/juegos/CicloHamiltoniano/index.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/juegos/coloreo-grafos" element={<ColoreoGrafosGame />} />
      <Route path="/juegos/encontrar-camino-mas-corto" element={<EncontrarCaminoMasCortoGame />} />
      <Route path="/juegos/encontrar-camino" element={<EncontrarCamino />} />
      <Route path="/juegos/ciclo-hamiltoniano" element={<CicloHamiltonianoGame />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
