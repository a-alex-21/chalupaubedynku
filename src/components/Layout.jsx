import { siteUrl } from "../urls";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Menu, X, Mountain, ArrowUp, Phone } from "lucide-react";
import { navigation } from "../data";
import { Button } from "./Shared";

function Brand() {
  return (
    <a
      className="brand"
      href={siteUrl("/")}
      aria-label="Chalupa u Bedýnků – úvod"
    >
      <Mountain aria-hidden="true" strokeWidth={1.25} />
      <span>
        u Bedýnků<small>PRKENNÝ DŮL · KRKONOŠE</small>
      </span>
    </a>
  );
}
export function Layout({ page, children }) {
  const [menu, setMenu] = useState(false);
  const links = navigation.map(([route, label]) => (
    <a
      key={route}
      href={siteUrl(route === "index" ? "/" : `/${route}.html`)}
      aria-current={page === route ? "page" : undefined}
    >
      {label}
    </a>
  ));
  return (
    <>
      <a className="skip-link" href="#main">
        Přeskočit na obsah
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Hlavní navigace">
            {links}
          </nav>
          <div className="header-actions">
            <a
              className="header-phone"
              href="tel:+420720657935"
              aria-label="Zavolat +420 720 657 935"
            >
              <Phone size={16} />
            </a>
            <Button
              className="header-booking"
              href={siteUrl("/rezervace.html")}
            >
              Poptat termín
              <ArrowUpRight size={17} />
            </Button>
            <Dialog.Root open={menu} onOpenChange={setMenu}>
              <Dialog.Trigger asChild>
                <button
                  className="menu-toggle icon-button"
                  aria-label="Otevřít navigaci"
                >
                  <Menu />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content
                  className="mobile-menu"
                  aria-describedby={undefined}
                >
                  <Dialog.Title>Navigace</Dialog.Title>
                  <Dialog.Close
                    className="icon-button"
                    aria-label="Zavřít navigaci"
                  >
                    <X />
                  </Dialog.Close>
                  <nav aria-label="Mobilní navigace">
                    {links}
                    <a href={siteUrl("/rezervace.html")}>
                      Poptat termín <ArrowUpRight size={20} />
                    </a>
                  </nav>
                  <a className="menu-contact" href="tel:+420720657935">
                    +420 720 657 935
                  </a>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Brand />
            <p>
              Celá chalupa pro 2–14 osob.
              <br />
              Prkenný Důl 67, 542 01 Žacléř.
            </p>
          </div>
          <div>
            <h3>Kontakt</h3>
            <a href="tel:+420720657935">+420 720 657 935</a>
            <a href="tel:+420776893644">+420 776 893 644</a>
            <a href="mailto:chataubedynku@seznam.cz">chataubedynku@seznam.cz</a>
          </div>
          <div>
            <h3>Chalupa</h3>
            <a href={siteUrl("/ubytovani.html")}>Ubytování</a>
            <a href={siteUrl("/aktivity.html")}>Aktivity a výlety</a>
            <a href={siteUrl("/cenik.html")}>Ceník</a>
          </div>
          <div>
            <h3>Před pobytem</h3>
            <a href={siteUrl("/pokyny.html")}>Informace před příjezdem</a>
            <a href={siteUrl("/provozni-rad.html")}>Provozní řád</a>
            <a href={siteUrl("/rezervace.html")}>
              Poptávka pobytu <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
            Chalupa u Bedýnků
          </span>
          <span>50.64352° N &nbsp; 15.90526° E</span>
          <a href="#main">
            Nahoru <ArrowUp size={13} />
          </a>
        </div>
      </footer>
    </>
  );
}
