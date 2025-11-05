export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="flex gap-2">
      <input
        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400/40"
        placeholder="Name / Model"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={onClear}
          className="px-3 rounded-xl border border-zinc-800 hover:bg-zinc-900"
        >
          Clear
        </button>
      )}
    </div>
  );
}

