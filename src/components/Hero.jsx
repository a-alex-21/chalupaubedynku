import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Sun,
  Snowflake,
  Images,
  MapPin,
  MoveHorizontal,
} from "lucide-react";
import { photoById } from "../data";
import { Photo, useGallery } from "./Shared";

export function Hero() {
  const [season, setSeason] = useState("summer");
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const [viewport, embla] = useEmblaCarousel({
    loop: true,
    duration: reduced ? 0 : 35,
  });
  const openGallery = useGallery();
  const slides = [
    photoById(season),
    photoById("living"),
    photoById("pergola"),
    photoById("sauna"),
  ];
  useEffect(() => {
    if (!embla) return;
    const sync = () => setSelected(embla.selectedScrollSnap());
    sync();
    embla.on("select", sync);
    return () => embla.off("select", sync);
  }, [embla]);
  const selectSeason = (value) => {
    setSeason(value);
    embla?.scrollTo(0);
  };
  return (
    <section
      className="hero"
      aria-label="Chalupa u Bedýnků – prohlídka"
      aria-roledescription="karusel"
    >
      <div className="hero-viewport" ref={viewport}>
        <div className="hero-track">
          {slides.map((photo, index) => (
            <div
              className={`hero-slide hero-slide-${photo.id}`}
              key={index}
              role="group"
              aria-roledescription="snímek"
              aria-label={`${index + 1} ze ${slides.length}: ${photo.title}`}
              aria-hidden={index !== selected}
            >
              <AnimatePresence initial={false}>
                <m.img
                  key={photo.id}
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  fetchPriority={index === 0 ? "high" : undefined}
                  loading={index === 0 ? "eager" : "lazy"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.65 }}
                  draggable="false"
                />
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-shade" />
      <div className="hero-top">
        <span className="hero-location">
          <MapPin size={14} /> Prkenný Důl, Krkonoše
        </span>
        <div className="season-switch" role="group" aria-label="Roční období">
          <button
            aria-pressed={season === "summer"}
            onClick={() => selectSeason("summer")}
          >
            <Sun size={15} />
            Léto
          </button>
          <button
            aria-pressed={season === "winter"}
            onClick={() => selectSeason("winter")}
          >
            <Snowflake size={15} />
            Zima
          </button>
        </div>
      </div>
      <div className="hero-copy">
        <span className="hero-eyebrow">SOUKROMÉ UBYTOVÁNÍ V KRKONOŠÍCH</span>
        <h1>
          Chalupa
          <br />u Bedýnků<span className="hero-period">.</span>
        </h1>
        <p>
          Celá chalupa pro 2–14 osob.
          <br />
          Tři ložnice, sauna a sjezdovka za rohem.
        </p>
        <div className="hero-actions">
          <a className="button button-cream" href="#termin">
            Vybrat termín
            <ArrowUpRight size={20} />
          </a>
          <button
            className="hero-gallery-link"
            onClick={() => openGallery(slides[selected].id)}
          >
            <Images size={17} /> Fotogalerie
          </button>
        </div>
      </div>
      <div className="hero-bottom">
        <div className="slide-controls">
          <button
            className="hero-arrow"
            aria-label="Předchozí snímek"
            onClick={() => embla?.scrollPrev()}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            className="hero-arrow"
            aria-label="Další snímek"
            onClick={() => embla?.scrollNext()}
          >
            <ArrowRight size={18} />
          </button>
          <span className="slide-count" aria-live="polite">
            0{selected + 1}
            <span> / 04</span>
          </span>
          <span className="drag-hint">
            <MoveHorizontal size={15} />
            Tažením prohlédnout
          </span>
        </div>
        <div className="hero-thumbnails" aria-label="Vyberte snímek">
          {slides.map((photo, index) => (
            <button
              key={photo.id}
              className={index === selected ? "active" : ""}
              aria-label={`Zobrazit: ${photo.title}`}
              aria-pressed={index === selected}
              onClick={() => embla?.scrollTo(index)}
            >
              <Photo photo={photo} />
              <span>{["Chalupa", "Interiér", "Pergola", "Sauna"][index]}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="hero-side-label" aria-hidden="true">
        ŽACLÉŘ / CZECH REPUBLIC
      </div>
    </section>
  );
}
