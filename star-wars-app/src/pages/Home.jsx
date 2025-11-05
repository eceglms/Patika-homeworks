import { useEffect, useMemo, useRef, useState } from "react";
import StarshipCard from "../components/StarshipCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import SkeletonCard from "../components/SkeletonCard.jsx";
import EmptyState from "../components/EmptyState.jsx";

const API = "https://swapi.dev/api/starships/";

export default function Home() {
  const [ships, setShips] = useState([]);
  const [next, setNext] = useState(API);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  // React 18 StrictMode'da effect'in iki kez tetiklenmesini güvenli şekilde engelle
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    fetchPage(API);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchPage(url) {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // url'e göre uniq birleştir (duplicate key uyarılarını önler)
      setShips((prev) => {
        const map = new Map();
        [...prev, ...data.results].forEach((s) => map.set(s.url, s));
        return Array.from(map.values());
      });

      setNext(data.next);
    } catch (e) {
      console.error(e);
      setError("Veri alınamadı. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return ships;
    return ships.filter((s) =>
      [s.name, s.model].some((v) => String(v).toLowerCase().includes(term))
    );
  }, [ships, q]);

  return (
    <section className="space-y-6">
      <div className="text-sm text-zinc-400 uppercase tracking-widest">
        <span className="text-yellow-300 font-semibold">STAR WARS</span>
        <span className="mx-2">/</span> Starships
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-wide text-yellow-300">
          STARSHIPS
        </h1>
        <p className="text-zinc-400 mt-1">SWAPI ile yıldız gemileri</p>
      </div>

      <SearchBar value={q} onChange={setQ} onClear={() => setQ("")} />

      {error && (
        <div className="p-3 border border-red-700 bg-red-900/20 rounded-xl">
          {error}
        </div>
      )}

      {/* İlk açılışta yükleme iskeleti */}
      {loading && ships.length === 0 && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Boş sonuç */}
      {!error && filtered.length === 0 && !loading && <EmptyState />}

      {/* Liste */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ship) => (
          <StarshipCard key={ship.url} ship={ship} />
        ))}
      </div>

      {/* Daha Fazla */}
      <div className="flex justify-center pt-4">
        {next ? (
          <button
            disabled={loading}
            onClick={() => fetchPage(next)}
            className="px-4 py-2 rounded-xl border border-zinc-800 hover:bg-zinc-900 disabled:opacity-50"
          >
            {loading ? "Yükleniyor..." : "Daha Fazla"}
          </button>
        ) : (
          ships.length > 0 && (
            <span className="text-zinc-500 text-sm">Hepsi yüklendi.</span>
          )
        )}
      </div>
    </section>
  );
}
