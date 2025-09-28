import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../data/questions";

const DURATION = 30; // saniye
const HIDE_FOR = 4;  // ilk 4 sn şıklar gizli

export default function Quiz() {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [sec, setSec] = useState(DURATION);
  const [reveal, setReveal] = useState(false);
  const [locked, setLocked] = useState(false);
  const [answers, setAnswers] = useState([]); // kullanıcı cevapları
  const startedAt = useRef(Date.now());

  const q = useMemo(() => questions[idx], [idx]);

  // soru değiştiğinde sayaç ve görünürlükleri resetle
  useEffect(() => {
    setSec(DURATION);
    setReveal(false);
    setLocked(false);

    const iv = setInterval(() => setSec((s) => s - 1), 1000);
    const showTimer = setTimeout(() => setReveal(true), HIDE_FOR * 1000);

    return () => {
      clearInterval(iv);
      clearTimeout(showTimer);
    };
  }, [idx]);

  // süre bitince otomatik geç
  useEffect(() => {
    if (sec <= 0) {
      saveAndNext(null); // boş
    }
  }, [sec]);

  function saveAndNext(choice) {
    if (locked) return;
    setLocked(true);

    setAnswers((prev) => {
      const clone = [...prev];
      clone[idx] = choice; // string ya da null
      return clone;
    });

    setTimeout(() => {
      if (idx === questions.length - 1) {
        navigate("/result", {
          state: {
            answers: answersWith(choice),
            startedAt: startedAt.current,
            finishedAt: Date.now(),
          },
          replace: true,
        });
      } else {
        setIdx((i) => i + 1);
      }
    }, 500);
  }

  // son soruda state’e son tıklananı da eklemek
  function answersWith(lastChoice) {
    const clone = [...answers];
    clone[idx] = lastChoice;
    return clone;
  }

  const progress = ((DURATION - sec) / DURATION) * 100;

  return (
    <section className="space-y-4">
      {/* üst bilgi + zaman */}
      <div className="flex items-center justify-between text-sm">
        <div>
          Soru {idx + 1}/{questions.length}
        </div>
        <div>{sec}s</div>
      </div>

      {/* progress */}
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full bg-indigo-400/70 transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Soru kartı */}
      <div className="bg-white/5 rounded-2xl p-5 shadow-xl ring-1 ring-white/10 backdrop-blur">
        {/* Görsel */}
        {q.image && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-white/5 mb-5">
            <img
              src={q.image}
              alt=""
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        )}

        {/* Soru */}
        <h3 className="text-base font-semibold mb-3">{q.question}</h3>

        {/* Şıklar */}
        {!reveal ? (
          <p className="text-sm italic text-indigo-300/80">
            Seçenekler <strong>{HIDE_FOR}</strong> saniye sonra görünecek…
          </p>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-3">
            {q.options.map((opt) => {
              const chosen = answers[idx] === opt;
              return (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => saveAndNext(opt)}
                    disabled={locked}
                    className={[
                      "w-full text-left p-4 rounded-xl ring-1 transition",
                      "bg-white/5 ring-white/10 hover:bg-white/10",
                      chosen ? "border-2 border-indigo-400/70" : "",
                      locked ? "opacity-60 cursor-not-allowed" : "",
                    ].join(" ")}
                  >
                    {opt}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
