import { siteUrl } from "../urls";
import {
  BedDouble,
  Users,
  Flame,
  Car,
  ArrowUpRight,
  Mountain,
  Snowflake,
  Trees,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { Hero } from "../components/Hero";
import { BookingBar } from "../components/BookingBar";
import { RoomExplorer } from "../components/RoomExplorer";
import {
  SectionHeading,
  TextLink,
  Photo,
  FAQ,
  CTA,
} from "../components/Shared";
import { photoById, faqs, image } from "../data";
export function Home() {
  const [season, setSeason] = useState("summer");
  return (
    <>
      <Hero />
      <BookingBar />
      <section className="section container">
        <SectionHeading
          number="01 / CHALUPA"
          title={
            <>
              Celá chalupa.
              <br />
              Až 14 hostů.
            </>
          }
          description="Prkenný Důl u Žacléře. Tři ložnice, dvě koupelny a společné zázemí pro rodiny i skupiny přátel."
        >
          <TextLink href={siteUrl("/ubytovani.html")}>
            Vybavení a pokoje
          </TextLink>
        </SectionHeading>
        <div className="amenities-strip">
          {[
            [Users, "2–14 osob", "Pronájem celého objektu"],
            [BedDouble, "3 ložnice", "12 lůžek + 2 přistýlky"],
            [Flame, "Krb a sauna", "Součást chalupy"],
            [Car, "Vlastní parkování", "Přímo u objektu"],
          ].map(([Icon, title, note]) => (
            <div key={title}>
              <Icon strokeWidth={1.4} />
              <span>
                <strong>{title}</strong>
                <small>{note}</small>
              </span>
            </div>
          ))}
        </div>
        <RoomExplorer />
      </section>
      <section className="surroundings-section">
        <div className="container surroundings-layout">
          <div className="surroundings-image">
            <Photo
              photo={
                season === "winter"
                  ? photoById("ski")
                  : {
                      ...photoById("summer"),
                      src: image("chalupa-summer-sharp"),
                      width: 1448,
                      height: 1086,
                    }
              }
            />
            <span className="location-card">
              <MapPin size={18} />
              <span>
                Prkenný Důl<small>Žacléř, Krkonoše</small>
              </span>
              <ArrowUpRight size={18} />
            </span>
          </div>
          <div className="surroundings-copy">
            <span className="eyebrow">02 / OKOLÍ</span>
            <h2>
              Krkonoše.
              <br />
              Po celý rok.
            </h2>
            <div
              className="filter-row"
              role="group"
              aria-label="Aktivity podle sezony"
            >
              <button
                aria-pressed={season === "summer"}
                onClick={() => setSeason("summer")}
              >
                <Trees size={15} />
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
            <div aria-live="polite">
              <h3>
                {season === "summer"
                  ? "Výlety, kola a program pro děti."
                  : "Sjezdovky v pěší vzdálenosti."}
              </h3>
              <p>
                {season === "summer"
                  ? "Rýchorský prales, Stachelberg a cyklotrasy Žacléřskem. Pohádková vesnička je hned vedle chalupy."
                  : "Ski areál Bret je vedle chalupy, Arakis přibližně 300 m. V okolí se můžete napojit na běžkařské trasy."}
              </p>
              <div className="distance-list">
                {(season === "summer"
                  ? [
                      ["Rýchorský prales", "2 km"],
                      ["Stachelberg a Eliška", "3 km"],
                      ["Pohádková vesnička", "Vedle chalupy"],
                    ]
                  : [
                      ["Ski areál Bret", "Vedle chalupy"],
                      ["Ski areál Arakis", "300 m"],
                      ["Běžkařské trasy", "Krkonoše"],
                    ]
                ).map(([title, distance]) => (
                  <div key={title}>
                    <span>{title}</span>
                    <strong>{distance}</strong>
                  </div>
                ))}
              </div>
            </div>
            <TextLink href={siteUrl("/aktivity.html")}>
              Všechny aktivity
            </TextLink>
          </div>
        </div>
      </section>
      <section className="section container faq-layout">
        <div>
          <span className="eyebrow">03 / INFORMACE</span>
          <h2>Časté dotazy.</h2>
          <p>
            Podrobnosti k pobytu najdete také
            <br />v pokynech před příjezdem.
          </p>
          <TextLink href={siteUrl("/pokyny.html")}>Pokyny pro hosty</TextLink>
        </div>
        <FAQ items={faqs} />
      </section>
      <CTA />
    </>
  );
}
