import { MapPin, Phone, Mail, ArrowUpRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { PageHeading, CTA, Photo } from "../components/Shared";
import { photoById } from "../data";
import rules from "../rules.json";
export function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText("50.64352, 15.90526");
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <>
      <PageHeading
        title="Kontakt a příjezd."
        description="Prkenný Důl 67, 542 01 Žacléř. Parkování přímo u chalupy."
      />
      <section className="container section-topless contact-layout">
        <div className="contact-details">
          <article>
            <span className="eyebrow">REZERVACE A DOTAZY</span>
            <h2>Ozvěte se nám.</h2>
            <a className="contact-primary" href="tel:+420720657935">
              <Phone size={20} />
              +420 720 657 935
            </a>
            <p>Ondřej Najman</p>
            <a className="contact-primary" href="tel:+420776893644">
              <Phone size={20} />
              +420 776 893 644
            </a>
            <p>Adam Najman</p>
            <a className="contact-email" href="mailto:chataubedynku@seznam.cz">
              <Mail size={18} />
              chataubedynku@seznam.cz
            </a>
          </article>
          <article>
            <span className="eyebrow">ADRESA</span>
            <address>
              Chalupa u Bedýnků
              <br />
              Prkenný Důl 67
              <br />
              542 01 Žacléř
            </address>
            <div className="gps-line">
              <span>50.64352 N, 15.90526 E</span>
              <button
                className="icon-button"
                onClick={copy}
                aria-label="Kopírovat GPS souřadnice"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>
            <span className="small-note" role="status">
              {copied
                ? "Souřadnice zkopírovány."
                : copyError
                  ? "Souřadnice můžete označit a zkopírovat ručně."
                  : ""}
            </span>
            <a
              className="button"
              href="https://goo.gl/maps/AK2X6PvLgbXbwk83A"
              target="_blank"
              rel="noreferrer"
            >
              Otevřít navigaci
              <ArrowUpRight size={17} />
              <span className="sr-only">(nové okno)</span>
            </a>
          </article>
          <details className="billing">
            <summary>Fakturační údaje</summary>
            <address>
              Ondřej Najman
              <br />
              Pod Jánským kopečkem 42
              <br />
              586 01 Jihlava
              <br />
              IČ: 06014305
            </address>
            <p>Podnikatel je zapsán na ŽÚ v Jihlavě.</p>
          </details>
        </div>
        <div className="contact-map">
          <iframe
            title="Mapa polohy Chalupy u Bedýnků"
            src="https://maps.google.com/maps?q=50.64352,15.90526&z=14&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map-property">
            <Photo photo={photoById("summer")} />
            <span>
              <strong>Chalupa u Bedýnků</strong>
              <small>Prkenný Důl 67, Žacléř</small>
            </span>
            <MapPin size={22} />
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
export function Information({ type }) {
  const entries = rules[type];
  const title =
    type === "pokyny" ? "Informace před příjezdem." : "Provozní řád.";
  return (
    <>
      <PageHeading
        title={title}
        description={
          type === "pokyny"
            ? "Příjezd, předání klíčů, platby a vybavení."
            : "Pravidla pro pobyt v chalupě a používání vybavení."
        }
      />
      <section className="container section-topless rules-layout">
        <aside className="rules-sidebar">
          <span className="eyebrow">OBSAH</span>
          {entries.map((entry, i) => (
            <a key={entry.id} href={`#${entry.id}`}>
              <span>0{i + 1}</span>
              {entry.title}
            </a>
          ))}
        </aside>
        <div className="rules-content">
          {entries.map((entry, i) => (
            <article id={entry.id} key={entry.id}>
              <span className="eyebrow">0{i + 1}</span>
              <div>
                <h2>{entry.title}</h2>
                {entry.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
