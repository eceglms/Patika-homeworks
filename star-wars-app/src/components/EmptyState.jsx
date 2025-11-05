export default function EmptyState({ title = "Sonuç bulunamadı", desc = "Filtreyi temizleyip tekrar deneyin." }) {
  return (
    <div className="text-center py-12 border border-zinc-800 rounded-2xl bg-zinc-900/40">
      <div className="mx-auto mb-3 h-10 w-10 rounded-full border border-zinc-700 grid place-items-center">☄️</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-zinc-400 mt-1">{desc}</p>
    </div>
  );
}
