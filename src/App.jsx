import { LazyMotion, domAnimation } from "motion/react";
import { Layout } from "./components/Layout";
import { GalleryProvider } from "./components/Shared";
import { Home } from "./pages/Home";
import { Accommodation } from "./pages/Accommodation";
import { Activities } from "./pages/Activities";
import { Pricing } from "./pages/Pricing";
import { Booking } from "./pages/Booking";
import { Contact, Information } from "./pages/Information";
export function routeFromPath(path) {
  return path === "/"
    ? "index"
    : path
        .split("/")
        .pop()
        .replace(/\.html$/, "") || "index";
}
export default function App({ page = "index" }) {
  const pages = {
    index: <Home />,
    ubytovani: <Accommodation />,
    aktivity: <Activities />,
    cenik: <Pricing />,
    kontakt: <Contact />,
    rezervace: <Booking />,
    pokyny: <Information type="pokyny" />,
    "provozni-rad": <Information type="provozni-rad" />,
  };
  return (
    <LazyMotion features={domAnimation}>
      <GalleryProvider>
        <Layout page={page}>
          {pages[page] || (
            <div className="container page-heading">
              <h1>Stránka nenalezena.</h1>
              <a href="/">Zpět na chalupu</a>
            </div>
          )}
        </Layout>
      </GalleryProvider>
    </LazyMotion>
  );
}
