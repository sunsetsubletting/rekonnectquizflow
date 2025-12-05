const PATHS = {
  vitality: 0,  // Moringa
  balance: 0,   // Ayurveda
  flow: 0,      // Beets
  clarity: 0,   // Lion's Mane
  serenity: 0,  // Magnesium
  purity: 0     // Digestive Enzymes
};

const answers = {
  q1: null,
  q2: null,
  q3: null
};

function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// BUTTON HANDLERS
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    const next = btn.dataset.q;
    const val = btn.dataset.value;

    if (next) {
      answers[next === "q2" ? "q1" : "q2"] = val;
      show(next);
    }

    // FINAL BUTTON
    if (btn.dataset.final) {
      answers.q3 = val;
      show("loading");
      setTimeout(runQuiz, 1200);
    }
  });
});

// SCORING LOGIC

function scoreQ1(val) {
  if (val === "all_hours") { PATHS.flow++; PATHS.clarity++; }
  if (val === "early_bird") { PATHS.balance++; PATHS.vitality++; }
  if (val === "late_night") { PATHS.serenity++; PATHS.purity++; }
}

function scoreQ2(val) {
  if (val === "energy") PATHS.vitality += 2;
  if (val === "stress") PATHS.balance += 2;
  if (val === "digestion") PATHS.purity += 2;
  if (val === "focus") PATHS.clarity += 2;
  if (val === "cardio") PATHS.flow += 2;
}

function scoreQ3(val) {
  if (val === "tension") PATHS.serenity += 2;
  if (val === "scatter") PATHS.clarity += 2;
  if (val === "bloat") PATHS.purity += 2;
  if (val === "drained") PATHS.vitality += 2;
  if (val === "stamina") PATHS.flow += 2;
}

function runQuiz() {
  // reset (in case retake)
  for (let p in PATHS) PATHS[p] = 0;

  scoreQ1(answers.q1);
  scoreQ2(answers.q2);
  scoreQ3(answers.q3);

  const top = Object.entries(PATHS).sort((a,b) => b[1]-a[1])[0][0];

  show("result-" + top);
}
