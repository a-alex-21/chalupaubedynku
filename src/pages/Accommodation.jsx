import { siteUrl } from "../urls";
import { BedDouble, ArrowUpRight } from "lucide-react";
import {
  PageHeading,
  SectionHeading,
  PhotoButton,
  CTA,
  CheckList,
  TextLink,
} from "../components/Shared";
import { RoomExplorer } from "../components/RoomExplorer";
import { photoById } from "../data";
export function Accommodation() {
  return (
    <>
      <PageHeading
        title="Ubytování."
        description="Celá chalupa pro 2–14 osob. Tři ložnice, dvě koupelny, kuchyň, krb, sauna a pergola."
      />
      <section className="container section-topless">
        <RoomExplorer />
      </section>
      <section className="section container">
        <SectionHeading
          number="POKOJE"
          title="Tři ložnice v podkroví."
          description="12 lůžek a 2 přistýlky. K dispozici je dětská cestovní postýlka."
        />
        <div className="rooms-grid">
          {[
            ["room1", "Ložnice 01", "1× dvoulůžko a 1× palanda", "4 hosté"],
            [
              "room2",
              "Ložnice 02",
              "1× dvoulůžko, 2× samostatná postel, 2 přistýlky",
              "4–6 hostů",
            ],
            [
              "room3",
              "Ložnice 03",
              "1× dvoulůžko a 2× samostatná postel",
              "4 hosté",
            ],
          ].map(([id, title, description, count]) => (
            <article className="room-card" key={id}>
              <PhotoButton photo={photoById(id)} />
              <div>
                <span className="room-count">
                  <BedDouble size={14} />
                  {count}
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="tinted section">
        <div className="container two-column">
          <div>
            <span className="eyebrow">VYBAVENÍ</span>
            <h2>Co je k dispozici.</h2>
            <p>
              Chalupa se pronajímá jako celek. Parkování je přímo u objektu,
              příjezdová cesta se udržuje i v zimě.
            </p>
          </div>
          <CheckList
            items={[
              "Dvě koupelny s vanou a sprchou, dvě toalety",
              "Kuchyň s myčkou, troubou, lednicí a kávovarem",
              "Výčep s chlazením, televize, hry a šipky",
              "Krb na dřevo a elektrické vytápění",
              "Krytá pergola s grilem a venkovní kuchyní",
              "Uzamykatelná úschovna kol a lyží",
              "Povlečení, základní čisticí prostředky a 0,5 m³ dřeva na týden",
            ]}
          />
        </div>
      </section>
      <section className="section container">
        <div className="info-pair">
          <article>
            <span className="eyebrow">PŘÍJEZD A ODJEZD</span>
            <h3>Od 16:00 / do 10:00</h3>
            <p>
              Správcovou kontaktujte přibližně hodinu před příjezdem. Vlastní
              ručníky si vezměte s sebou.
            </p>
            <TextLink href={siteUrl("/pokyny.html")}>
              Informace před příjezdem
            </TextLink>
          </article>
          <article>
            <span className="eyebrow">PODMÍNKY</span>
            <h3>Kauce 5 000 Kč</h3>
            <p>
              Vratná kauce se skládá při příjezdu. Energie a poplatek z pobytu
              se účtují zvlášť.
            </p>
            <TextLink href={siteUrl("/provozni-rad.html")}>
              Provozní řád
            </TextLink>
          </article>
        </div>
      </section>
      <CTA />
    </>
  );
}
