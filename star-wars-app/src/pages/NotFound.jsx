import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto text-center py-16">
      <div className="text-5xl">🛰️</div>
      <h1 className="text-2xl font-bold mt-4">Kayıp sayfa</h1>
      <p className="text-zinc-400 mt-1">Aradığınız sayfa hiperuzay atlayıp gitmiş olabilir.</p>
      <Link
        to="/"
        className="inline-block mt-6 px-4 py-2 rounded-xl border border-zinc-800 hover:bg-zinc-900"
      >
        Ana sayfaya dön
      </Link>
    </div>
  );
}
