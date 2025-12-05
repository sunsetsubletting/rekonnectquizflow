import QuizBox from "./QuizBox";

function QuizHero() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {/* AI helper bubble */}
      <div className="rounded-3xl bg-white shadow-lg px-6 py-3 max-w-sm w-auto">


        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center text-sm">
            🤖
          </div>
          <div className="text-sm text-ink/80">
            Give me a second. I’m dialing into your baseline…
          </div>
        </div>
      </div>

      <p className="text-xs text-ink/60">
        Answer a few quick questions and I’ll build your Rekonnect ritual.
      </p>

      {/* QUIZ BOX */}
      <QuizBox />
    </div>
  );
}

export default QuizHero;
