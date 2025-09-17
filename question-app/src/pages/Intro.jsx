import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <section className="rounded-2xl p-6 md:p-8 shadow-xl ring-1 ring-white/10 bg-white/5">
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-200">Bilgilendirme</h2>

      {/* madde madde, alt alta */}
      <ul className="mt-5 space-y-3 text-slate-200">
        <li>Test <strong>10</strong> sorudan oluşur.</li>
        <li>Her soru ekranda en fazla <strong>30 saniye</strong> kalır.</li>
        <li>İlk <strong>4 saniye</strong> boyunca seçenekler gizlidir.</li>
        <li>Seçim yapınca veya süre dolunca otomatik olarak sonraki soruya geçilir.</li>
        <li>Geçmiş sorulara <strong>dönüş yoktur</strong>.</li>
      </ul>

      <button
        onClick={() => navigate("/quiz")}
        className="mt-6 w-full rounded-xl bg-[#0b132b] text-white py-3 font-medium hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#0b132b]/40 focus:ring-offset-2 focus:ring-offset-transparent"
      >
        Teste Başla
      </button>
    </section>
  );
}
