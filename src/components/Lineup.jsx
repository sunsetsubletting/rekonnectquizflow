import "./Lineup.css";
import balance from "/images/balance.png";
import vitality from "/images/vitality.png";
import purity from "/images/purity.png";
import serenity from "/images/serenity.png";
import flow from "/images/flow.png";
import noot from "/images/noot.png";

export default function Lineup() {
  return (
    <section className="lineup-section">
      <h2 className="lineup-title">The Rekonnect Collection</h2>

      <div className="lineup-grid">
        <img src={balance} alt="Balance" />
        <img src={vitality} alt="Vitality" />
        <img src={purity} alt="Purity" />
        <img src={serenity} alt="Serenity" />
        <img src={flow} alt="Flow" />
        <img src={noot} alt="Noot" />
      </div>
    </section>
  );
}
