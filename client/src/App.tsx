import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx"; 
import ColoreoGrafosGame from "./pages/juegos/ColoreoGrafos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/juegos/coloreo-grafos" element={<ColoreoGrafosGame />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
