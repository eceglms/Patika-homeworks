import { Outlet } from "react-router-dom";

export default function App() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0b132b] to-[#1c2541] text-indigo-200">
      {/* header */}
      <header className="border-b border-white/10 bg-black/10 backdrop-blur">
        <div className="container-1400 py-4">
          <h1 className="text-xl font-bold">Question App</h1>
        </div>
      </header>

      {/* main */}
      <main className="flex-1 grid place-items-center px-4">
        <div className="w-full max-w-2xl">
          <Outlet />
        </div>
      </main>

      {/* footer */}
      <footer className="mt-auto">
        <div className="container-1400 py-4 text-right text-indigo-300/70">
          ©{year} · Created by <span className="font-medium">Ece Gulmus</span>
        </div>
      </footer>
    </div>
  );
}
