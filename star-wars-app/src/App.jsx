import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 backdrop-blur bg-zinc-950/70 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold tracking-widest text-yellow-300">
            STAR WARS
          </Link>
          <nav className="text-sm text-zinc-300">Starships</nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/starship/:id" element={<Detail />} />
        </Routes>
      </main>
    </div>
  );
}
