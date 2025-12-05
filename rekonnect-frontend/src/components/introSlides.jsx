import React, { useState, useEffect } from "react";

console.log("INTROSLIDES FILE LOADED");

import "./introSlides.css";

export default function IntroSlides({ onDone }) {
  // Steps:
  // 0 = 1.png
  // 1 = 2.png
  // 2 = 3.png
  // 3 = NEW PNG (your user-first slide) 4.png
  // 4 = 5.png (your existing next image)
  // 5 = work-schedule
  // 6 = needs
  // 7 = ailments
  // 8 = desires
  // 9 = 9.png (final)

  const [step, setStep] = useState(0);
  const [fade, setFade] = useState("fade-in");
  const [answers, setAnswers] = useState([]);

  // Timed intro slides only
  useEffect(() => {
    let duration = null;

    if (step === 0) duration = 4000; // 1.png
    if (step === 1) duration = 7000; // 2.png
    if (step === 2) duration = 5000; // 3.png
    if (step === 3) duration = 2000; // NEW PNG slide (your “This Quiz” PNG)
    if (step === 9) duration = 2000; // final 9.png

    if (duration === null) return; // question slides

    setFade("fade-in");

    const hideTimer = setTimeout(() => setFade("fade-out"), duration - 600);

    const nextTimer = setTimeout(() => {
      if (step === 9) {
        onDone?.(answers);
      } else {
        setStep((s) => s + 1);
        setFade("fade-in");
      }
    }, duration);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [step, answers, onDone]);


  const recordAndNext = (value) => {
    setAnswers((prev) => [...prev, { step, value }]);
    setFade("fade-out");
    setTimeout(() => {
      setStep((s) => s + 1);
      setFade("fade-in");
    }, 300);
  };

const renderStep = () => {
  console.log("STEP", step);   // TEMP DEBUG

    // ------------ INTRO IMAGE SLIDES ------------
    if (step === 0) return <img src="/1.png" className="intro-img" alt="" />;
    if (step === 1) return <img src="/2.png" className="intro-img" alt="" />;
   // step 2 = old 3.png becomes step 3
if (step === 2)
  return <img src="/3.png" className="intro-img quiz-info" alt="" />;


// step 3 = your new PNG
if (step === 3) return <img src="/4.png" className="intro-img" alt="" />;

    // final image before done()
    if (step === 9) return <img src="/9.png" className="intro-img" alt="" />;


    // ------------ QUESTION SLIDES ------------
    // slide 1 (work schedule)
    if (step === 5) {
      return (
        <div className="slide-wrap">
          <h1 className="title">“your work-schedule”</h1>

          <div className="center-wrap">
            <div className="choice" onClick={() => recordAndNext("all_hours")}>
              all hours<br />disciplinarian
            </div>

            <div className="choice" onClick={() => recordAndNext("early_bird")}>
              early bird
            </div>

            <div className="choice" onClick={() => recordAndNext("late_night")}>
              late night<br />grinder
            </div>
          </div>

          <div className="hint-text">pick the most accurate option.</div>
          <img src="/oyster.png" className="oyster-mark" />
        </div>
      );
    }

    // slide 2 (needs)
    if (step === 6) {
      return (
        <div className="slide-wrap">
          <h1 className="title">“your needs”</h1>

          <div className="center-wrap">
            <div className="choice" onClick={() => recordAndNext("more_energy")}>
              more energy
            </div>

            <div className="choice" onClick={() => recordAndNext("stress_relief")}>
              stress relief
            </div>

            <div className="choice" onClick={() => recordAndNext("digestive_wellness")}>
              digestive<br />wellness
            </div>

            <div className="choice" onClick={() => recordAndNext("focus_productivity")}>
              focus and<br />productivity
            </div>

            <div className="choice" onClick={() => recordAndNext("cardio_boost")}>
              a<br />cardiovascular<br />boost
            </div>
          </div>

          <img src="/oyster.png" className="oyster-mark" />
        </div>
      );
    }

    // slide 3 (ailments)
    if (step === 7) {
      return (
        <div className="slide-wrap">
          <h1 className="title">“your ailments”</h1>

          <div className="center-wrap">
            <div className="choice" onClick={() => recordAndNext("bodily_tension")}>
              bodily tension
            </div>

            <div className="choice" onClick={() => recordAndNext("scatterbrained")}>
              scatterbrained
            </div>

            <div className="choice" onClick={() => recordAndNext("gut_bloat")}>
              gut bloat
            </div>

            <div className="choice" onClick={() => recordAndNext("emotional_drainage")}>
              emotional<br />drainage
            </div>

            <div className="choice" onClick={() => recordAndNext("lack_stamina")}>
              lack of<br />stamina
            </div>
          </div>

          <div className="hint-text">your responses are not saved.</div>
          <img src="/oyster.png" className="oyster-mark" />
        </div>
      );
    }

    // slide 4 (desires)
    if (step === 8) {
      return (
        <div className="slide-wrap">
          <h1 className="title">“your desires”</h1>

          <div className="center-wrap">
            <div className="choice" onClick={() => recordAndNext("clean_energy")}>
              clean energy
            </div>

            <div className="choice" onClick={() => recordAndNext("grounded_peace")}>
              groundedness, peace
            </div>

            <div className="choice" onClick={() => recordAndNext("stamina_power")}>
              stamina and power
            </div>

            <div className="choice" onClick={() => recordAndNext("clear_focus")}>
              clear focus
            </div>

            <div className="choice" onClick={() => recordAndNext("mental_balance")}>
              mental balance
            </div>

            <div className="choice" onClick={() => recordAndNext("clean_gut")}>
              a clean gut
            </div>
          </div>

          <img src="/oyster.png" className="oyster-mark" />
        </div>
      );
    }

    return null;
  };


  return (
    <div className="intro-slide-container">
      <div className={`intro-inner ${fade}`}>
        {renderStep()}
      </div>
    </div>
  );
}
