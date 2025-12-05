import "./Hero.css";
import balanceImg from "/images/balance.png";
import vitalityImg from "/images/vitality.png";
import purityImg from "/images/purity.png";
import serenityImg from "/images/serenity.png";
import flowImg from "/images/flow.png";
import nootImg from "/images/noot.png";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1 className="hero-title">ReKonnect With Your Best Self.</h1>
        <p className="hero-sub">
          Six natural supplements. Six paths toward balance, clarity, and renewal.
        </p>

        <button
          className="hero-cta"
          onClick={() => window.scrollTo({ top: 900, behavior: "smooth" })}
        >
          Explore the Lineup →
        </button>
      </div>

      <div className="hero-lineup">
        <img src={balanceImg} alt="Balance" className="hero-bottle" />
        <img src={vitalityImg} alt="Vitality" className="hero-bottle" />
        <img src={purityImg} alt="Purity" className="hero-bottle" />
        <img src={serenityImg} alt="Serenity" className="hero-bottle" />
        <img src={flowImg} alt="Flow" className="hero-bottle" />
        <img src={nootImg} alt="Noot" className="hero-bottle" />
      </div>
    </section>
  );
}
