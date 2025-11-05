import { Link } from "react-router-dom";

function getIdFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export default function StarshipCard({ ship }) {
  const id = getIdFromUrl(ship.url);
  const img = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;

  return (
    <Link
      to={`/starship/${id}`}
      className="bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition block"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={img}
          alt={ship.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = "https://placehold.co/800x500?text=Starship"; }}
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{ship.name}</h3>
        <p className="text-xs text-zinc-400 mt-1">Model: {ship.model}</p>
        <p className="text-xs text-zinc-400">Hyperdrive: {ship.hyperdrive_rating}</p>
      </div>
    </Link>
  );
}
