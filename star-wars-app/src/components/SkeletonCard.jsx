export default function SkeletonCard() {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-zinc-800/50" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-2/3 bg-zinc-800 rounded" />
        <div className="h-3 w-1/2 bg-zinc-800 rounded" />
        <div className="h-3 w-1/3 bg-zinc-800 rounded" />
      </div>
    </div>
  );
}
