import { useState } from "react";
import Quiz from "./Quiz";
import Results from "./Results";
import Hero from "./sections/Hero";
import Lineup from "./sections/Lineup";
import SixPaths from "./sections/SixPaths";
import About from "./sections/About";
import Footer from "./sections/Footer";
import "./HomePage.css";

export default function HomePage() {
  const [quizOpen, setQuizOpen] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [resultData, setResultData] = useState(null);

  const handleQuizComplete = (data) => {
    setResultData(data);
    setShowResults(true);
  };

  const closeResults = () => {
    setShowResults(false);
    setQuizOpen(false);  // reveals homepage
  };

  return (
    <div className="homepage-wrapper">

      {/* QUIZ OVERLAY */}
      {quizOpen && !showResults && (
        <div className="quiz-overlay">
          <Quiz onComplete={handleQuizComplete} />
        </div>
      )}

      {/* RESULTS OVERLAY */}
      {showResults && (
        <div className="results-overlay">
          <button className="results-close" onClick={closeResults}>×</button>
          <Results data={resultData} />
        </div>
      )}

      {/* HOMEPAGE CONTENT (REVEALED AFTER QUIZ CLOSES) */}
      {!quizOpen && (
        <div className="homepage-content">
          <Hero />
          <Lineup />
          <SixPaths />
          <About />
          <Footer />
        </div>
      )}
    </div>
  );
}
