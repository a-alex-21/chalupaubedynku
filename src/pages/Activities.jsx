import { useState } from "react";
import {
  Snowflake,
  Mountain,
  Trees,
  Bike,
  Waves,
  ArrowUpRight,
} from "lucide-react";
import { PageHeading, PhotoButton, CTA } from "../components/Shared";
import { activities, photoById } from "../data";
const icons = {
  snow: Snowflake,
  mountain: Mountain,
  tree: Trees,
  bike: Bike,
  water: Waves,
};
export function Activities() {
  const [filter, setFilter] = useState("Vše");
  const visible =
    filter === "Vše"
      ? activities
      : activities.filter((a) => a.category === filter);
  return (
    <>
      <PageHeading
        title="Aktivity a výlety."
        description="Lyžování, pěší trasy a program pro děti v Prkenném Dole a okolí Žacléře."
      />
      <section className="container section-topless">
        <div className="activity-banner">
          <PhotoButton photo={photoById("ski")} />
          <PhotoButton photo={photoById("playground")} />
        </div>
        <div className="filter-heading">
          <div
            className="filter-row"
            role="group"
            aria-label="Filtrovat aktivity"
          >
            {["Vše", "Léto", "Zima", "S dětmi"].map((f) => (
              <button
                key={f}
                aria-pressed={f === filter}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <span aria-live="polite">
            {visible.length} {visible.length < 5 ? "aktivity" : "aktivit"}
          </span>
        </div>
        <div className="activities-grid">
          {visible.map((activity) => {
            const Icon = icons[activity.icon];
            return (
              <article key={activity.title} className="activity-card">
                <div className="activity-card-top">
                  <Icon size={25} strokeWidth={1.3} />
                  <span>{activity.distance}</span>
                </div>
                <span className="eyebrow">{activity.category}</span>
                <h2>{activity.title}</h2>
                <p>{activity.text}</p>
                <a
                  className="text-link"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.title + " Žacléř Krkonoše")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Zobrazit na mapě
                  <ArrowUpRight size={15} />
                  <span className="sr-only">(nové okno)</span>
                </a>
              </article>
            );
          })}
        </div>
        <p className="small-note">
          Vzdálenosti jsou orientační. Provoz areálů a sněhové podmínky si
          ověřte před výletem.
        </p>
      </section>
      <CTA />
    </>
  );
}
