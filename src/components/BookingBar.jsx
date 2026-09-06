import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Users, Minus, Plus } from "lucide-react";
import { localDate, addDays } from "../booking";
export function BookingBar() {
  const [today, setToday] = useState("");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [people, setPeople] = useState(8);
  useEffect(() => setToday(localDate()), []);
  return (
    <div className="booking-bar-wrap container" id="termin">
      <div className="booking-bar-caption">
        <span>VÁŠ POBYT</span>
        <span>Nezávazná poptávka · celá chalupa</span>
      </div>
      <form className="booking-bar" action="/rezervace.html" method="GET">
        <label className="booking-date">
          <CalendarDays size={19} />
          <span>
            <span className="field-label">Příjezd</span>
            <input
              aria-label="Příjezd"
              type="date"
              name="arrival"
              value={arrival}
              min={today}
              required
              onChange={(e) => {
                setArrival(e.target.value);
                if (departure < addDays(e.target.value, 2)) setDeparture("");
              }}
            />
          </span>
        </label>
        <label className="booking-date">
          <CalendarDays size={19} />
          <span>
            <span className="field-label">Odjezd</span>
            <input
              aria-label="Odjezd"
              type="date"
              name="departure"
              value={departure}
              min={addDays(arrival || today, 2)}
              required
              onChange={(e) => setDeparture(e.target.value)}
            />
          </span>
        </label>
        <div className="booking-guests">
          <Users size={19} />
          <div>
            <label className="field-label" htmlFor="quick-people">
              Hosté
            </label>
            <div className="guest-control">
              <button
                type="button"
                aria-label="Méně hostů"
                disabled={people <= 2}
                onClick={() => setPeople((p) => p - 1)}
              >
                <Minus size={13} />
              </button>
              <input
                id="quick-people"
                name="people"
                type="number"
                value={people}
                min="2"
                max="14"
                required
                onChange={(e) =>
                  setPeople(e.target.value === "" ? "" : Number(e.target.value))
                }
              />
              <button
                type="button"
                aria-label="Více hostů"
                disabled={people >= 14}
                onClick={() => setPeople((p) => Number(p) + 1)}
              >
                <Plus size={13} />
              </button>
            </div>
          </div>
        </div>
        <button className="button" type="submit">
          Poptat termín
          <ArrowUpRight size={20} />
        </button>
      </form>
      <p className="booking-bar-note">
        Minimálně 2 noci. Dostupnost ověřujeme osobně.
      </p>
    </div>
  );
}
