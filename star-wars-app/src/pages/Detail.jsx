import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const [ship, setShip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let ignore = false;
    async function run() {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(`https://swapi.dev/api/starships/${id}/`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!ignore) setShip(data);
      } catch (e) {
        console.error(e);
        if (!ignore) setErr("Detay alınamadı. Lütfen tekrar deneyin.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => { ignore = true; };
  }, [id]);

  const img = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;

  if (loading) return <p className="p-6 text-zinc-400">Yükleniyor…</p>;
  if (err) return (
    <div className="p-6">
      <p className="text-red-400 mb-3">{err}</p>
      <Link to="/" className="underline text-yellow-300">Ana sayfaya dön</Link>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-xl border border-zinc-800 hover:bg-zinc-900"
      >
        ← Geri
      </Link>

      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="aspect-[16/9]">
          <img
            src={img}
            alt={ship?.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = "https://placehold.co/1000x600?text=Starship"; }}
          />
        </div>

        <div className="p-5 space-y-2">
          <h2 className="text-2xl font-bold">{ship?.name}</h2>
          <p className="text-zinc-400">Model: {ship?.model}</p>

          <div className="grid sm:grid-cols-2 gap-3 pt-2 text-sm">
            <Info label="Manufacturer" value={ship?.manufacturer} />
            <Info label="Hyperdrive Rating" value={ship?.hyperdrive_rating} />
            <Info label="Max Atmosphering Speed" value={ship?.max_atmosphering_speed} />
            <Info label="Crew" value={ship?.crew} />
            <Info label="Passengers" value={ship?.passengers} />
            <Info label="Cargo Capacity" value={ship?.cargo_capacity} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-zinc-950/50 border border-zinc-800 rounded-xl p-3">
      <div className="text-zinc-400">{label}</div>
      <div className="font-medium break-words">{value || "—"}</div>
    </div>
  );
}
