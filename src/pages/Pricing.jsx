import { siteUrl } from "../urls";
import { useState } from "react";
import { ArrowUpRight, Info } from "lucide-react";
import { prices, money } from "../data";
import { PageHeading, Button, CTA } from "../components/Shared";
import { validGuests } from "../booking";
export function Pricing() {
  const [period, setPeriod] = useState("week");
  const [season, setSeason] = useState("off");
  const [people, setPeople] = useState(8);
  const selected = prices.find((p) => p.id === season);
  const total = selected[period];
  return (
    <>
      <PageHeading
        title="Ceník pronájmu."
        description="Ceny za celou chalupu. Minimální pobyt jsou 2 noci, týdenní turnusy jsou sobota–sobota."
      />
      <section className="container section-topless pricing-layout">
        <div>
          <div className="filter-row" role="group" aria-label="Délka pobytu">
            <button
              aria-pressed={period === "week"}
              onClick={() => setPeriod("week")}
            >
              Týden
            </button>
            <button
              aria-pressed={period === "weekend"}
              onClick={() => setPeriod("weekend")}
            >
              Víkend
            </button>
          </div>
          <div className="price-list">
            <div className="price-list-head">
              <span>OBDOBÍ</span>
              <span>
                CELÁ CHALUPA / {period === "week" ? "TÝDEN" : "VÍKEND"}
              </span>
            </div>
            {prices.map((price) => (
              <button
                key={price.id}
                className={`price-row ${season === price.id ? "selected" : ""}`}
                aria-pressed={season === price.id}
                onClick={() => setSeason(price.id)}
              >
                <span>
                  <strong>{price.label}</strong>
                  <small>{price.detail}</small>
                </span>
                <span>
                  {price[period] === null ? "Na dotaz" : money(price[period])}
                  <ArrowUpRight size={16} />
                </span>
              </button>
            ))}
          </div>
        </div>
        <aside className="price-calculator">
          <span className="eyebrow">ORIENTAČNÍ ROZPOČET</span>
          <h2>{selected.label}</h2>
          <p>
            {period === "week" ? "Týdenní pobyt" : "Víkendový pobyt"} · celá
            chalupa
          </p>
          <label htmlFor="price-people">Počet hostů</label>
          <div className="range-heading">
            <input
              id="price-people"
              type="range"
              min="2"
              max="14"
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
            />
            <output htmlFor="price-people">{people}</output>
          </div>
          <div className="calculator-total" aria-live="polite">
            <span>Celkem za pronájem</span>
            <strong>{total === null ? "Na dotaz" : money(total)}</strong>
            {total !== null && validGuests(people) && (
              <small>
                ≈ {money(Math.round(total / people))} za osobu / celý pobyt
              </small>
            )}
          </div>
          <p className="calculator-note">
            <Info size={15} />
            Bez energií a místních poplatků. Konečnou cenu a dostupnost
            potvrdíme.
          </p>
          <Button href={siteUrl(`/rezervace.html?people=${people}`)}>
            Poptat pobyt
            <ArrowUpRight size={17} />
          </Button>
        </aside>
      </section>
      <section className="section container">
        <div className="info-trio">
          <article>
            <span className="eyebrow">01 / PLATBA</span>
            <h3>Záloha 50 %</h3>
            <p>
              Zbytek ceny se doplácí měsíc před příjezdem. Při příjezdu se
              skládá vratná kauce 5 000 Kč.
            </p>
          </article>
          <article>
            <span className="eyebrow">02 / POPLATKY</span>
            <h3>Energie a pobyt</h3>
            <p>
              Hradí se skutečná spotřeba energie. V zimě orientačně 3 000 Kč za
              objekt za týden. Poplatek z pobytu dle aktuální vyhlášky města
              Žacléř.
            </p>
          </article>
          <article>
            <span className="eyebrow">03 / PO DOMLUVĚ</span>
            <h3>Víkendy a skupiny</h3>
            <p>
              Víkendy mimo sezonu řešíme individuálně. Pro větší skupiny je
              možné domluvit i sousední chalupu Woody.
            </p>
          </article>
        </div>
      </section>
      <CTA />
    </>
  );
}
