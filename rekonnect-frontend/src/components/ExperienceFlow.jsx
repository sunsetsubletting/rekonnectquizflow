// ExperienceFlow.jsx
import React, { useState, useEffect } from "react";
import "./ExperienceFlow.css";
import OysterIcon from "./OysterIcon";

const RESULT_BG = {
  moringa: "/results/moringabg.png",
  ayurveda: "/results/ayurvedabg.png",
  beet: "/results/beetbg.png",
  noot: "/results/lionsmanebg.png",
  mag: "/results/magbg.png",
  digest: "/results/digestbg.png", // ACV bg
};

// ---------------- COLORS + RESULT COPY ----------------

const OYSTER_COLORS = {
  moringa: "#4f6f54",
  ayurveda: "#c46a3b",
  beet: "#8a1c32",
  noot: "#d8b869",
  mag: "#4a6fa5",
  digest: "#5A1F1F", // ACV burgundy
};

const RESULT_COPY = {
  moringa: {
    line1: "the miracle leaf of the ancient world,",
    line2: "your energy rises with the sun again.",
    cta: "begin vitality →",
  },
  ayurveda: {
    line1: "three thousand years of calm woven into one ritual.",
    line2: "your balance returns, quietly.",
    cta: "enter balance →",
  },
  beet: {
    line1: "bloodflow, warmth, movement, momentum.",
    line2: "your body begins to flow again.",
    cta: "step into flow →",
  },
  noot: {
    line1: "the nootropic of the future, grounded in nature.",
    line2: "your mind clears like a cloudless sky.",
    cta: "unlock clarity →",
  },
  mag: {
    line1: "nervous system settling, tension dissolving.",
    line2: "your evenings grow softer.",
    cta: "enter serenity →",
  },
  digest: {
    // ACV / gut-focused
    line1: "your digestion steadies, your belly unburns.",
    line2: "lightness returns where heaviness lived.",
    cta: "explore purity →",
  },
};

const INITIAL_SCORES = {
  moringa: 0,
  ayurveda: 0,
  beet: 0,
  mag: 0,
  digest: 0,
  noot: 0,
};

// ---------------- MAIN COMPONENT ----------------

export default function ExperienceFlow() {
  // steps:
  // 1 = intro 1
  // 2 = intro 2
  // 3 = PNG intro "let's get you started"
  // 4 = anonymous slide
  // 5 = primary/secondary explanation
  // 6–9 = Q1–Q4
  // 10 = complete slide
  // 11 = final results (dual)

  const [step, setStep] = useState(1);
  const [fade, setFade] = useState("fade-in");
  const [scores, setScores] = useState(INITIAL_SCORES);

  // quiz click logic
  const [clickStage, setClickStage] = useState("primary");
  const [selectedPrimary, setSelectedPrimary] = useState(null);

  // overlay + scroll lock
  const [overlayOpen, setOverlayOpen] = useState(true);

  // lock body scroll while quiz/results overlay is open
  useEffect(() => {
    if (overlayOpen) {
      document.body.classList.add("quiz-open");
    } else {
      document.body.classList.remove("quiz-open");
    }
    return () => {
      document.body.classList.remove("quiz-open");
    };
  }, [overlayOpen]);

  const next = () => {
    setFade("fade-out");
    setTimeout(() => {
      setStep((s) => s + 1);
      setFade("fade-in");
    }, 300);
  };

  // ---------------- QUESTION LOGIC (Primary + Secondary Clicks) ----------------

  const handleSelect = (inc) => {
    if (clickStage === "primary") {
      setSelectedPrimary(inc);
      setClickStage("secondary");
    } else {
      // secondary chosen → apply both scores
      setScores((prev) => {
        const n = { ...prev };

        // add primary batch
        for (const k in selectedPrimary) n[k] += selectedPrimary[k];

        // add secondary batch
        for (const k in inc) n[k] += inc[k];

        return n;
      });

      // reset click state
      setClickStage("primary");
      setSelectedPrimary(null);

      next();
    }
  };

  // ---------------- COMPLETE AUTO-ADVANCE ----------------

  useEffect(() => {
    if (step === 10) {
      const t = setTimeout(() => next(), 2600);
      return () => clearTimeout(t);
    }
  }, [step]);

  // ---------------- RESULT RANKING ----------------

  const sortedKeys = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k);

  const primaryResult = sortedKeys[0];
  const secondaryResult = sortedKeys[1];

  const [whichResult, setWhichResult] = useState("primary");
  const toggleResult = () =>
    setWhichResult((w) => (w === "primary" ? "secondary" : "primary"));

  // ---------------- SHARED RENDER HELPERS ----------------

  const renderImageIntro = (src) => (
    <div className="image-slide" onClick={next}>
      <img src={src} className="intro-img" alt="" />
    </div>
  );

  const renderAnonymousIntro = () => (
    <>
      <h1 className="intro-title">“this quiz is anonymous.”</h1>
      <p className="intro-sub">your answers are not saved.</p>
      <button className="intro-btn" onClick={next}>
        continue
      </button>
    </>
  );

  const renderPrimarySecondaryIntro = () => (
    <>
      <h1 className="intro-title">“pick your primary & secondary.”</h1>
      <p className="intro-sub">
        your primary guides what matters most — your secondary supports the rest.
      </p>
      <button className="intro-btn" onClick={next}>
        begin
      </button>
    </>
  );

  // ---------------- QUIZ SCREENS ----------------

  const renderQ1 = () => (
    <>
      <h1 className="quiz-title">“your work-schedule”</h1>
      <div className="quiz-options-row">
        <button
          className="quiz-option"
          onClick={() => handleSelect({ ayurveda: 1, moringa: 1 })}
        >
          morning person
        </button>
        <button
          className="quiz-option"
          onClick={() => handleSelect({ beet: 1, noot: 1 })}
        >
          all hours disciplinarian
        </button>
        <button
          className="quiz-option"
          onClick={() => handleSelect({ mag: 1, digest: 1 })}
        >
          late night grinder
        </button>
      </div>
      <p className="quiz-note-right">
        {clickStage === "primary"
          ? "choose your primary."
          : "now choose your secondary."}
      </p>
      <OysterIcon progress={0.25} color="#000" className="oyster-quiz" />
    </>
  );

  const renderQ2 = () => (
    <>
      <h1 className="quiz-title">“your needs”</h1>
      <div className="quiz-options-row quiz-options-row-wide">
        <button
          className="quiz-option"
          onClick={() => handleSelect({ moringa: 1 })}
        >
          more energy
        </button>
        <button
          className="quiz-option"
          onClick={() => handleSelect({ ayurveda: 1 })}
        >
          stress relief
        </button>
        <button
          className="quiz-option"
          onClick={() => handleSelect({ digest: 1 })}
        >
          digestive wellness
        </button>
        <button
          className="quiz-option"
          onClick={() => handleSelect({ noot: 1, mag: 1 })}
        >
          focus & productivity
        </button>
        <button
          className="quiz-option"
          onClick={() => handleSelect({ beet: 1 })}
        >
          cardiovascular boost
        </button>
      </div>
      <p className="quiz-note-right">
        {clickStage === "primary"
          ? "choose your primary."
          : "now choose your secondary."}
      </p>
      <OysterIcon progress={0.5} color="#000" className="oyster-quiz" />
    </>
  );

  const renderQ3 = () => (
    <>
      <h1 className="quiz-title">“your ailments”</h1>
      <div className="quiz-options-row quiz-options-row-wide">
        <button
          className="quiz-option"
          onClick={() => handleSelect({ mag: 1, ayurveda: 1 })}
        >
          bodily tension
        </button>
        <button
          className="quiz-option"
          onClick={() => handleSelect({ noot: 1, mag: 1 })}
        >
          scatterbrained
        </button>
        <button
          className="quiz-option"
          onClick={() => handleSelect({ digest: 1 })}
        >
          gut bloat
        </button>
        <button
          className="quiz-option"
          onClick={() => handleSelect({ ayurveda: 1, moringa: 1 })}
        >
          emotional drainage
        </button>
        <button
          className="quiz-option"
          onClick={() => handleSelect({ beet: 1, ayurveda: 1 })}
        >
          lack of stamina
        </button>
      </div>
      <p className="quiz-note-right">
        {clickStage === "primary"
          ? "choose your primary."
          : "now choose your secondary."}
      </p>
      <OysterIcon progress={0.75} color="#000" className="oyster-quiz" />
    </>
  );

  const renderQ4 = () => (
    <>
      <h1 className="quiz-title">“your desires”</h1>
      <div className="quiz-options-row quiz-options-row-wide">
        <button
          className="quiz-option"
          onClick={() => handleSelect({ moringa: 1 })}
        >
          clean energy
        </button>
        <button
          className="quiz-option"
          onClick={() => handleSelect({ ayurveda: 1 })}
        >
          grounded peace
        </button>
        <button
          className="quiz-option"
          onClick={() => handleSelect({ beet: 1, moringa: 1 })}
        >
          stamina & power
        </button>
        <button
          className="quiz-option"
          onClick={() => handleSelect({ noot: 1 })}
        >
          clear focus
        </button>
        <button
          className="quiz-option"
          onClick={() => handleSelect({ mag: 1, ayurveda: 1 })}
        >
          mental balance
        </button>
        <button
          className="quiz-option"
          onClick={() => handleSelect({ digest: 1 })}
        >
          clean gut
        </button>
      </div>
      <p className="quiz-note-right">
        {clickStage === "primary"
          ? "choose your primary."
          : "now choose your secondary."}
      </p>
      <OysterIcon progress={1} color="#000" className="oyster-quiz" />
    </>
  );

  // ---------------- COMPLETE TRANSITION ----------------

  const renderComplete = () => (
    <div className="result-shell">
      <OysterIcon progress={1} color="#000" className="oyster-complete" />
      <div className="complete-text">
        <h1>complete.</h1>
        <p>let’s get you sorted.</p>
      </div>
    </div>
  );

  // ---------------- DUAL RESULTS ----------------

  const renderDualResult = () => {
    const key = whichResult === "primary" ? primaryResult : secondaryResult;
    const color = OYSTER_COLORS[key];
    const bgImage = RESULT_BG[key];

    return (
      <div className="result-shell fancy-result">
        {/* BACKGROUND IMAGE */}
        <img src={bgImage} alt="" className="result-bg-image" />

        {/* CONTENT LEFT SIDE */}
        <div className={`result-text-block result-animate-${whichResult}`}>
          <h1 className="result-line">
            <span className="result-em">{key}</span> has chosen you.
          </h1>

          <p className="result-line">{RESULT_COPY[key].line1}</p>
          <p className="result-line">{RESULT_COPY[key].line2}</p>

          <div className="result-cta">
            <span className="result-cta-main">{RESULT_COPY[key].cta}</span>
            <span className="result-link">shop →</span>
          </div>

          {/* TOGGLE ARROW */}
          <div className="result-toggle" onClick={toggleResult}>
            {whichResult === "primary"
              ? "→ secondary result"
              : "← primary result"}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="result-divider"></div>

        {/* OYSTER */}
        <OysterIcon progress={1} color={color} className="oyster-final" />
      </div>
    );
  };

  // ---------------- STEP SWITCH ----------------

  const renderStep = () => {
    switch (step) {
      case 1:
        return renderImageIntro("/1.png");
      case 2:
        return renderImageIntro("/2.png");
      case 3:
        return renderImageIntro("/4.png");
      case 4:
        return renderAnonymousIntro();
      case 5:
        return renderPrimarySecondaryIntro();
      case 6:
        return renderQ1();
      case 7:
        return renderQ2();
      case 8:
        return renderQ3();
      case 9:
        return renderQ4();
      case 10:
        return renderComplete();
      case 11:
        return renderDualResult();
      default:
        return null;
    }
  };

  // ---------------- CLOSE RESULTS → REVEAL HOMEPAGE ----------------

  const handleCloseOverlay = () => {
    setOverlayOpen(false);
  };

  // ---------------- SIMPLE HOMEPAGE BEHIND QUIZ ----------------

  const renderHomepage = () => (
    <div className="homepage-shell">
      <section className="hero-section">
        <h1 className="hero-title">reconnect with your best self.</h1>
        <p className="hero-sub">
          six focused formulations. one system to bring your body back to center.
        </p>
      </section>

      <section className="lineup-section">
        <div className="lineup-row">
          <div className="lineup-item">balance</div>
          <div className="lineup-item">vitality</div>
          <div className="lineup-item">purity</div>
          <div className="lineup-item">serenity</div>
          <div className="lineup-item">flow</div>
          <div className="lineup-item">noot</div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="experience-root">
      {/* QUIZ / RESULTS OVERLAY (MANDATORY ON LOAD) */}
      {overlayOpen && (
        <div className="quiz-overlay">
          {/* minimal X only on final results */}
          {step === 11 && (
            <button className="results-close" onClick={handleCloseOverlay}>
              ×
            </button>
          )}

          <div className={`experience-shell ${fade}`}>{renderStep()}</div>
        </div>
      )}

      {/* HOMEPAGE BEHIND QUIZ */}
      {renderHomepage()}
    </div>
  );
}
