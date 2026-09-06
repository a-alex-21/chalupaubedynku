import { useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  BedDouble,
  Flame,
  CookingPot,
  Trees,
  Waves,
} from "lucide-react";
import { photoById } from "../data";
import { Photo, useGallery, CheckList } from "./Shared";
const rooms = [
  {
    id: "living",
    label: "Obývací pokoj",
    icon: Flame,
    title: "Společenská místnost s krbem",
    text: "Velký stůl, pohovka a kamenný krb v přízemí.",
    items: [
      "Televize, satelit a DVD",
      "Výčep s chlazením",
      "Hry a elektronické šipky",
    ],
  },
  {
    id: "room1",
    label: "Ložnice",
    icon: BedDouble,
    title: "Tři ložnice v podkroví",
    text: "Až 14 lůžek včetně dvou přistýlek.",
    items: [
      "3 samostatné ložnice",
      "Dětská cestovní postýlka",
      "Povlečení připravené na pobyt",
    ],
  },
  {
    id: "kitchen",
    label: "Kuchyň",
    icon: CookingPot,
    title: "Vybavená kuchyň",
    text: "Vše potřebné pro vlastní vaření.",
    items: [
      "Myčka, trouba a varná deska",
      "Lednice a vinotéka",
      "Kávovar Dolce Gusto",
    ],
  },
  {
    id: "pergola",
    label: "Pergola",
    icon: Trees,
    title: "Krytá pergola s grilem",
    text: "Venkovní posezení pro celou skupinu.",
    items: ["Velký stůl pod střechou", "Krb a gril", "Malá venkovní kuchyň"],
  },
  {
    id: "sauna",
    label: "Sauna",
    icon: Waves,
    title: "Finská sauna",
    text: "Součást zázemí chalupy.",
    items: ["Podrobnosti domluvíme před pobytem", "Vlastní ručníky s sebou"],
  },
];
export function RoomExplorer() {
  const [active, setActive] = useState(0);
  const room = rooms[active];
  const photo = photoById(room.id);
  const openGallery = useGallery();
  const reduced = useReducedMotion();
  return (
    <div className="room-explorer">
      <div
        className="explorer-tabs"
        role="tablist"
        aria-label="Prostory chalupy"
      >
        {rooms.map((item, i) => (
          <button
            key={item.id}
            role="tab"
            id={`room-tab-${item.id}`}
            aria-controls="room-panel"
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              let next;
              if (e.key === "ArrowRight") next = (i + 1) % rooms.length;
              if (e.key === "ArrowLeft")
                next = (i + rooms.length - 1) % rooms.length;
              if (e.key === "Home") next = 0;
              if (e.key === "End") next = rooms.length - 1;
              if (next !== undefined) {
                e.preventDefault();
                setActive(next);
                document.getElementById(`room-tab-${rooms[next].id}`)?.focus();
              }
            }}
          >
            <item.icon size={18} />
            {item.label}
            <ArrowUpRight size={15} />
          </button>
        ))}
      </div>
      <div
        className="explorer-panel"
        id="room-panel"
        role="tabpanel"
        aria-labelledby={`room-tab-${room.id}`}
        tabIndex={0}
      >
        <button
          className="explorer-photo"
          aria-label={`Zvětšit: ${photo.title}`}
          onClick={() => openGallery(photo.id)}
        >
          <AnimatePresence initial={false}>
            <m.img
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.35 }}
            />
          </AnimatePresence>
          <span className="image-pill">
            Prohlédnout <ArrowUpRight size={14} />
          </span>
        </button>
        <div className="explorer-info">
          <span className="eyebrow">0{active + 1} / 05</span>
          <h3>{room.title}</h3>
          <p>{room.text}</p>
          <CheckList items={room.items} />
        </div>
      </div>
    </div>
  );
}
