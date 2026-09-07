import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { photoById } from "../data";
import { Photo } from "./Shared";
import { siteUrl } from "../urls";

const moments = [
  {
    id: "summer",
    time: "CHALUPA A OKOLÍ",
    title: "Chalupa v Krkonoších.",
    text: "Celá chalupa pro 2–14 hostů v Prkenném Dole u Žacléře. Z okolí můžete vyrazit pěšky do Rýchor nebo na kole po trasách Žacléřska.",
    note: "Chalupa se zahradou",
  },
  {
    id: "living",
    time: "SPOLEČENSKÁ MÍSTNOST",
    title: "Posezení u krbu.",
    text: "Obývací pokoj s kamenným krbem, pohovkou a velkým stolem. Pro společné večery jsou k dispozici hry, elektronické šipky a televize. Jídlo připravíte ve vybavené kuchyni.",
    note: "Obývací pokoj s krbem",
  },
  {
    id: "sauna",
    time: "SAUNA A SPORT",
    title: "Sauna po výletě.",
    text: "Součástí chalupy je finská sauna. V létě ji můžete využít po pěším výletě nebo jízdě na kole, v zimě po lyžování. Areál Bret je hned vedle, Arakis přibližně 300 m od chalupy.",
    note: "Finská sauna",
  },
  {
    id: "pergola",
    time: "VENKOVNÍ POSEZENÍ",
    title: "Pergola s grilem.",
    text: "Krytá pergola s velkým stolem, krbem, grilem a malou venkovní kuchyní. Prostor pro společné jídlo a grilování. Vedle chalupy je také Pohádková vesnička s herními prvky pro děti.",
    note: "Krytá pergola",
  },
];

function StoryPhoto({ moment, active }) {
  const photo = photoById(moment.id);
  return (
    <Photo
      photo={photo}
      className={active ? "is-active" : ""}
      aria-hidden={!active}
    />
  );
}

export function WeekendStory() {
  const [active, setActive] = useState(0);
  const section = useRef(null);
  const steps = useRef([]);
  useEffect(() => {
    // Read the step nearest the viewport's middle, including reverse scrolling.
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const middle = window.innerHeight * 0.55;
        let nearest = 0;
        let distance = Infinity;
        steps.current.forEach((step, index) => {
          if (!step) return;
          const rect = step.getBoundingClientRect();
          const nextDistance = Math.abs(rect.top + rect.height / 2 - middle);
          if (nextDistance < distance) {
            distance = nextDistance;
            nearest = index;
          }
        });
        setActive(nearest);
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      window.removeEventListener("scroll", update);
      if (entry.isIntersecting) {
        window.addEventListener("scroll", update, { passive: true });
        update();
      }
    });
    observer.observe(section.current);
    window.addEventListener("resize", update);
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      className="weekend-section"
      ref={section}
      aria-labelledby="weekend-title"
    >
      <div className="container">
        <header className="weekend-heading">
          <div>
            <span className="eyebrow">PROSTORY A AKTIVITY</span>
            <h2 id="weekend-title">
              V chalupě.
              <br />
              <span>A v jejím okolí.</span>
            </h2>
          </div>
          <p>
            Posezení, sauna i výlety.
            <br />
            Prohlédněte si možnosti pobytu.
            <ArrowDown size={22} aria-hidden="true" />
          </p>
        </header>
        <div className="weekend-layout">
          <div className="weekend-visual" aria-hidden="true">
            <div className="weekend-photo-stack">
              {moments.map((moment, index) => (
                <StoryPhoto
                  key={moment.id}
                  moment={moment}
                  active={active === index}
                />
              ))}
              <span className="weekend-photo-caption">
                {moments[active].note}
                <span>0{active + 1} / 04</span>
              </span>
            </div>
            <div className="weekend-progress">
              {moments.map((moment, index) => (
                <span
                  className={index <= active ? "is-active" : ""}
                  key={moment.id}
                />
              ))}
            </div>
          </div>
          <div className="weekend-steps">
            {moments.map((moment, index) => (
              <article
                key={moment.id}
                ref={(el) => {
                  steps.current[index] = el;
                }}
                className={`weekend-step ${active === index ? "is-active" : ""}`}
              >
                <Photo
                  photo={photoById(moment.id)}
                  className="weekend-mobile-photo"
                />
                <span className="weekend-time">
                  <span>0{index + 1}</span>
                  {moment.time}
                </span>
                <h3>{moment.title}</h3>
                <p>{moment.text}</p>
                {index === moments.length - 1 && (
                  <a className="text-link" href={siteUrl("/rezervace.html")}>
                    Poptat pobyt <ArrowUpRight size={18} />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
