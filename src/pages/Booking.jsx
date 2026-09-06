import { siteUrl } from "../urls";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Phone,
  Check,
  CalendarDays,
  Users,
  Info,
} from "lucide-react";
import { PageHeading, Photo, CheckList } from "../components/Shared";
import { photoById } from "../data";
import {
  localDate,
  addDays,
  nightCount,
  nightLabel,
  readBookingQuery,
} from "../booking";
export function Booking() {
  const [stay, setStay] = useState({ arrival: "", departure: "", people: 8 });
  const [today, setToday] = useState("");
  const [next, setNext] = useState(
    "https://www.chataubedynku.cz/rezervace.html?odeslano=1",
  );
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const date = localDate();
    setToday(date);
    setStay(readBookingQuery(window.location.search, date));
    setNext(
      new URL(siteUrl("rezervace.html?odeslano=1"), window.location.origin)
        .href,
    );
    setSent(
      new URLSearchParams(window.location.search).get("odeslano") === "1",
    );
  }, []);
  const nights = nightCount(stay.arrival, stay.departure);
  const updateArrival = (e) => {
    const arrival = e.target.value;
    setStay((s) => ({
      ...s,
      arrival,
      departure: s.departure < addDays(arrival || today, 2) ? "" : s.departure,
    }));
  };
  return (
    <>
      <PageHeading
        title="Poptávka pobytu."
        description="Vyberte termín a počet hostů. Dostupnost a cenu vám potvrdíme e-mailem nebo telefonicky."
      />
      <section className="container section-topless reservation-layout">
        <aside className="reservation-summary">
          <Photo photo={photoById("summer")} />
          <div>
            <span className="eyebrow">CELÁ CHALUPA</span>
            <h2>Chalupa u Bedýnků</h2>
            <p>Prkenný Důl 67, Žacléř</p>
            <div className="stay-summary" aria-live="polite">
              <span>
                <Users size={16} />
                {stay.people || "—"} hostů
              </span>
              <span>
                <CalendarDays size={16} />
                {nights >= 2 ? nightLabel(nights) : "Minimálně 2 noci"}
              </span>
            </div>
            <CheckList
              items={[
                "3 ložnice, 2 koupelny",
                "Krb, sauna a pergola s grilem",
                "Příjezd od 16:00, odjezd do 10:00",
                "Záloha 50 %, vratná kauce 5 000 Kč",
              ]}
            />
            <a className="summary-phone" href="tel:+420720657935">
              <Phone size={16} />
              <span>
                Raději telefonicky?<strong>+420 720 657 935</strong>
              </span>
            </a>
          </div>
        </aside>
        <div className="reservation-form-panel">
          {sent ? (
            <div className="sent-message" role="status">
              <Check />
              <h2>Poptávka odeslána.</h2>
              <p>
                Ozveme se s dostupností a cenou. Rezervace platí až po našem
                potvrzení.
              </p>
              <a className="text-link" href={siteUrl("/")}>
                Zpět na chalupu <ArrowUpRight size={16} />
              </a>
            </div>
          ) : (
            <form
              action="https://formsubmit.co/chataubedynku@seznam.cz"
              method="POST"
              onSubmit={(e) => {
                if (nights < 2) {
                  e.preventDefault();
                  e.currentTarget.elements.Odjezd.setCustomValidity(
                    "Minimální délka pobytu jsou 2 noci.",
                  );
                  e.currentTarget.reportValidity();
                }
              }}
            >
              <input
                type="hidden"
                name="_subject"
                value="Nová poptávka – Chalupa u Bedýnků"
              />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={next} />
              <input
                type="hidden"
                name="Delka pobytu"
                value={nights >= 2 ? nightLabel(nights) : ""}
              />
              <input
                className="honeypot"
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                aria-label="Nevyplňujte"
              />
              <fieldset>
                <legend>
                  <span>01</span> Termín a hosté
                </legend>
                <div className="form-grid">
                  <label className="field">
                    Příjezd
                    <input
                      type="date"
                      name="Prijezd"
                      value={stay.arrival}
                      onChange={updateArrival}
                      min={today}
                      required
                    />
                  </label>
                  <label className="field">
                    Odjezd
                    <input
                      type="date"
                      name="Odjezd"
                      value={stay.departure}
                      onChange={(e) => {
                        e.target.setCustomValidity("");
                        setStay({ ...stay, departure: e.target.value });
                      }}
                      min={addDays(stay.arrival || today, 2)}
                      required
                    />
                  </label>
                  <label className="field">
                    Počet hostů
                    <input
                      name="Pocet osob"
                      type="number"
                      min="2"
                      max="14"
                      value={stay.people}
                      required
                      onChange={(e) =>
                        setStay({ ...stay, people: e.target.value })
                      }
                    />
                  </label>
                  <label className="field">
                    Přijedete se psem?
                    <select name="Pes" defaultValue="Ne">
                      <option>Ne</option>
                      <option>Ano</option>
                    </select>
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <span>02</span> Kontaktní údaje
                </legend>
                <div className="form-grid">
                  <label className="field full">
                    Jméno a příjmení
                    <input
                      name="Jmeno"
                      autoComplete="name"
                      placeholder="Jan Novák"
                      required
                    />
                  </label>
                  <label className="field">
                    E-mail
                    <input
                      name="Email"
                      type="email"
                      autoComplete="email"
                      placeholder="jan@email.cz"
                      required
                    />
                  </label>
                  <label className="field">
                    Telefon
                    <input
                      name="Telefon"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+420"
                      required
                    />
                  </label>
                  <label className="field full">
                    Poznámka <span className="optional">(nepovinné)</span>
                    <textarea
                      name="Poznamka"
                      placeholder="Děti, pes, sauna nebo další dotazy…"
                      rows={4}
                    />
                  </label>
                </div>
              </fieldset>
              <label className="consent">
                <input
                  type="checkbox"
                  name="Souhlas"
                  value="Souhlasím se zpracováním údajů pro vyřízení poptávky"
                  required
                />
                <span>
                  Souhlasím se zpracováním kontaktních údajů pro vyřízení této
                  poptávky.
                </span>
              </label>
              <button type="submit" className="button submit-button">
                Odeslat nezávaznou poptávku
                <ArrowUpRight size={19} />
              </button>
              <p className="form-note">
                <Info size={14} />
                Odeslání není závazná rezervace. Údaje použijeme pouze k
                vyřízení poptávky.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
