import { useState, useRef } from "react";
import { m, useReducedMotion, useInView } from "motion/react";
import { ArrowUpRight, Sun, Snowflake, Images, MapPin } from "lucide-react";
import { photoById } from "../data";
import { useGallery } from "./Shared";

export function Hero() {
  const [season, setSeason] = useState("summer");
  const [winterReady, setWinterReady] = useState(false);
  const reduced = useReducedMotion();
  const sceneRef = useRef(null);
  const inView = useInView(sceneRef);
  const openGallery = useGallery();
  return (
    <section
      ref={sceneRef}
      className={`hero hero-season-${season} ${reduced || !inView ? "scene-paused" : ""}`}
      aria-label="Chalupa u Bedýnků – prohlídka"
    >
      <div
        className="hero-slide hero-main-photo"
        role="group"
        aria-label={photoById(season).title}
      >
        <div className="hero-season-scene">
          <img
            src={photoById("summer").src}
            alt={season === "summer" ? photoById("summer").alt : ""}
            aria-hidden={season !== "summer"}
            width={photoById("summer").width}
            height={photoById("summer").height}
            fetchPriority="high"
            loading="eager"
            draggable="false"
          />
          <m.img
            className="hero-winter-layer"
            src={photoById("winter").src}
            alt={season === "winter" ? photoById("winter").alt : ""}
            aria-hidden={season !== "winter"}
            width={photoById("winter").width}
            height={photoById("winter").height}
            loading="eager"
            onLoad={() => setWinterReady(true)}
            ref={(image) => {
              if (image?.complete && image.naturalWidth > 0)
                setWinterReady(true);
            }}
            initial={false}
            animate={{
              opacity: season === "winter" && winterReady ? 1 : 0,
            }}
            transition={{
              duration: reduced ? 0 : 1.2,
              ease: "easeInOut",
            }}
            draggable="false"
          />
          <div
            className={`season-atmosphere ${season === "winter" && winterReady ? "is-winter" : ""}`}
            aria-hidden="true"
          >
            <div className="snowfall">
              {Array.from({ length: 22 }, (_, i) => (
                <i
                  key={i}
                  style={{
                    "--x": `${(i * 47) % 100}%`,
                    "--delay": `${-i * 1.7}s`,
                    "--duration": `${9 + (i % 7)}s`,
                    "--size": `${2 + (i % 4)}px`,
                  }}
                />
              ))}
            </div>
          </div>
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
            onClick={() => setSeason("summer")}
          >
            <Sun size={15} />
            Léto
          </button>
          <button
            aria-pressed={season === "winter"}
            onClick={() => setSeason("winter")}
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
            onClick={() => openGallery(season)}
          >
            <Images size={17} /> Fotogalerie
          </button>
        </div>
      </div>
      <div className="hero-side-label" aria-hidden="true">
        ŽACLÉŘ / CZECH REPUBLIC
      </div>
    </section>
  );
}
