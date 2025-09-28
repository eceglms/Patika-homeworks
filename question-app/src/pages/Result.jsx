import { useLocation, useNavigate } from "react-router-dom";
import questions from "../data/questions";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const answers = state?.answers ?? [];
  const stats = calcStats(answers);

  return (
    <section className="space-y-4">
      {/* Özet kutusu */}
      <div className="bg-white/5 rounded-2xl p-5 shadow-xl ring-1 ring-white/10 backdrop-blur">
        <h2 className="text-lg font-semibold">Sonuçlar</h2>
        <div className="mt-2 flex items-center gap-6 text-sm">
          <div>Doğru <span className="font-semibold text-emerald-300">{stats.correct}</span></div>
          <div>Yanlış <span className="font-semibold text-rose-300">{stats.wrong}</span></div>
          <div>Boş <span className="font-semibold text-amber-300">{stats.blank}</span></div>
        </div>
        <button
          className="mt-4 rounded-xl bg-[#0b132b] text-white py-2 px-4 text-sm hover:bg-[#101a3a] transition"
          onClick={() => navigate("/", { replace: true })}
        >
          Yeniden Başla
        </button>
      </div>

      <div className="space-y-3">
        {questions.map((q, i) => {
          const mine = answers[i] ?? null;
          const isCorrect = mine === q.answer;

          return (
            <div
              key={q.question}
              className="bg-white/5 rounded-2xl p-4 shadow ring-1 ring-white/10 backdrop-blur"
            >
              <p className="text-indigo-200 font-medium">
                {i + 1}. {q.question}
              </p>
              <p className="mt-1 text-sm text-indigo-300">
                Senin cevabın:{" "}
                <span
                  className={
                    isCorrect
                      ? "font-semibold text-emerald-300"
                      : mine === null
                      ? "font-semibold text-amber-300"
                      : "font-semibold text-rose-300"
                  }
                >
                  {mine ?? "—"}
                </span>
              </p>
              <p className="text-xs text-indigo-400 mt-0.5">
                Doğru cevap: <span className="font-medium">{q.answer}</span>
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function calcStats(answers) {
  let correct = 0, wrong = 0, blank = 0;
  answers.forEach((a, i) => {
    if (a == null) blank++;
    else if (a === questions[i].answer) correct++;
    else wrong++;
  });
  return { correct, wrong, blank };
}
