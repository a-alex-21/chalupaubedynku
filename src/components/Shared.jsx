import { siteUrl } from "../urls";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  X,
  Expand,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import { photos } from "../data";

export function Button({ children, href, className = "", ...props }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      {...(href ? { href } : { type: "button" })}
      className={`button ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
export function TextLink({ href, children, ...props }) {
  return (
    <a className="text-link" href={href} {...props}>
      {children}
      <ArrowUpRight size={17} />
    </a>
  );
}
export function SectionHeading({ number, title, description, children }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{number}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </div>
  );
}
export function PageHeading({ eyebrow, title, description }) {
  return (
    <header className="page-heading container">
      <div className="breadcrumb">
        <a href={siteUrl("/")}>Chalupa</a>
        <span>/</span>
        {eyebrow || title}
      </div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  );
}
export function Photo({ photo, className = "", priority = false, ...props }) {
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
      {...props}
    />
  );
}
const GalleryContext = createContext(null);
export const useGallery = () => useContext(GalleryContext);
export function GalleryProvider({ children }) {
  const [open, setOpen] = useState(false);
  const returnFocus = useRef(null);
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState("Vše");
  const filtered =
    filter === "Vše" ? photos : photos.filter((p) => p.category === filter);
  const current = filtered[index] || filtered[0];
  const change = (delta) =>
    setIndex((i) => (i + delta + filtered.length) % filtered.length);
  const openGallery = (id = "summer") => {
    returnFocus.current = document.activeElement;
    setFilter("Vše");
    setIndex(
      Math.max(
        0,
        photos.findIndex((p) => p.id === id),
      ),
    );
    setOpen(true);
  };
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex(
          (i) =>
            (i + (e.key === "ArrowRight" ? 1 : -1) + filtered.length) %
            filtered.length,
        );
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, filtered.length]);
  return (
    <GalleryContext.Provider value={openGallery}>
      {children}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content
            className="gallery-dialog"
            aria-describedby={undefined}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              returnFocus.current?.focus();
            }}
          >
            <header className="gallery-header">
              <div>
                <Dialog.Title>Fotogalerie</Dialog.Title>
                <span>{photos.length} fotografií chalupy a okolí</span>
              </div>
              <Dialog.Close
                className="icon-button"
                aria-label="Zavřít fotogalerii"
              >
                <X />
              </Dialog.Close>
            </header>
            <div
              className="filter-row gallery-filters"
              role="group"
              aria-label="Kategorie fotografií"
            >
              {["Vše", "Exteriér", "Interiér", "Pokoje", "Okolí"].map(
                (category) => (
                  <button
                    key={category}
                    aria-pressed={filter === category}
                    onClick={() => {
                      setFilter(category);
                      setIndex(0);
                    }}
                  >
                    {category}
                  </button>
                ),
              )}
            </div>
            <div className="gallery-stage">
              <Photo photo={current} priority />
              <button
                className="gallery-arrow previous"
                onClick={() => change(-1)}
                aria-label="Předchozí fotografie"
              >
                <ArrowLeft />
              </button>
              <button
                className="gallery-arrow next"
                onClick={() => change(1)}
                aria-label="Další fotografie"
              >
                <ArrowRight />
              </button>
            </div>
            <div className="gallery-bottom" aria-live="polite">
              <span>{current.title}</span>
              <span>
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(filtered.length).padStart(2, "0")}
              </span>
            </div>
            <div className="gallery-thumbnails">
              {filtered.map((p, i) => (
                <button
                  key={p.id}
                  aria-label={`Zobrazit: ${p.title}`}
                  aria-pressed={i === index}
                  onClick={() => setIndex(i)}
                >
                  <Photo photo={p} />
                </button>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </GalleryContext.Provider>
  );
}
export function PhotoButton({ photo, className = "", children }) {
  const openGallery = useGallery();
  return (
    <button
      className={`photo-button ${className}`}
      onClick={() => openGallery(photo.id)}
      aria-label={`Otevřít fotografii: ${photo.title}`}
    >
      <Photo photo={photo} />
      {children}
      <span className="photo-expand">
        <Expand size={16} />
      </span>
    </button>
  );
}
export function FAQ({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="faq">
      {items.map(([question, answer], index) => (
        <div className="faq-item" key={question}>
          <h3>
            <button
              aria-expanded={open === index}
              aria-controls={`faq-${index}`}
              onClick={() => setOpen(open === index ? null : index)}
            >
              {question}
              {open === index ? <Minus size={18} /> : <Plus size={18} />}
            </button>
          </h3>
          <div id={`faq-${index}`} hidden={open !== index}>
            <p>{answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export function CTA() {
  return (
    <section className="cta-section container">
      <div>
        <span className="eyebrow">Rezervace</span>
        <h2>Vyberte si termín.</h2>
        <p>Dostupnost a konečnou cenu potvrdíme osobně.</p>
      </div>
      <Button href={siteUrl("/rezervace.html")}>
        Poptat pobyt <ArrowUpRight size={19} />
      </Button>
    </section>
  );
}
export function CheckList({ items }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
