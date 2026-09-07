import React from "react";
import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LazyMotion, domAnimation } from "motion/react";
import { GalleryProvider, PhotoButton } from "./components/Shared";
import { RoomExplorer } from "./components/RoomExplorer";
import { BookingBar } from "./components/BookingBar";
import { Hero } from "./components/Hero";
import { Pricing } from "./pages/Pricing";
import { Activities } from "./pages/Activities";
import { Booking } from "./pages/Booking";
import { photoById, money } from "./data";
const wrap = (children) =>
  render(
    <LazyMotion features={domAnimation}>
      <GalleryProvider>{children}</GalleryProvider>
    </LazyMotion>,
  );
describe("interactive property pages", () => {
  it("opens photos, filters the gallery, navigates with arrows and restores focus on Escape", async () => {
    const user = userEvent.setup();
    wrap(<PhotoButton photo={photoById("summer")} />);
    const trigger = screen.getByRole("button", {
      name: "Otevřít fotografii: Chalupa v létě",
    });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Fotogalerie" });
    expect(dialog).toBeVisible();
    await user.click(
      within(dialog).getByRole("button", { name: "Pokoje", exact: true }),
    );
    expect(within(dialog).getByText("01 / 03")).toBeVisible();
    expect(within(dialog).getByText("Ložnice 01")).toBeVisible();
    await user.keyboard("{ArrowRight}");
    expect(within(dialog).getByText("Ložnice 02")).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(document.body).not.toHaveAttribute("data-scroll-locked");
  });
  it("switches room panels using both pointer and keyboard controls", async () => {
    const user = userEvent.setup();
    wrap(<RoomExplorer />);
    await user.click(screen.getByRole("tab", { name: "Kuchyň" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Vybavená kuchyň");
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Pergola" })).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent(
      "Krytá pergola s grilem",
    );
  });
  it("switches the hero to winter and opens the actual photo viewer", async () => {
    const user = userEvent.setup();
    const { container } = wrap(<Hero />);
    expect(container.querySelector(".hero-thumbnails")).toBeNull();
    expect(
      screen.queryByRole("button", { name: "Další snímek" }),
    ).not.toBeInTheDocument();
    const summerLayer = container.querySelector(".hero-season-scene img");
    const winterLayer = container.querySelector(".hero-winter-layer");
    expect(winterLayer).toHaveStyle({ opacity: "0" });
    await user.click(screen.getByRole("button", { name: "Zima", exact: true }));
    expect(
      screen.getByRole("button", { name: "Zima", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("group", { name: "Chalupa v zimě" }),
    ).toBeInTheDocument();
    // Keep summer underneath until the winter download completes.
    expect(winterLayer).toHaveStyle({ opacity: "0" });
    expect(container.querySelector(".hero-season-scene img")).toBe(summerLayer);
    fireEvent.load(winterLayer);
    await waitFor(() => expect(winterLayer).toHaveStyle({ opacity: "1" }), {
      timeout: 2000,
    });
    await user.click(screen.getByRole("button", { name: "Léto", exact: true }));
    await waitFor(() => expect(winterLayer).toHaveStyle({ opacity: "0" }), {
      timeout: 2000,
    });
    await user.click(screen.getByRole("button", { name: "Zima", exact: true }));
    await user.click(
      screen.getByRole("button", { name: "Fotogalerie", exact: true }),
    );
    const gallery = screen.getByRole("dialog", { name: "Fotogalerie" });
    expect(gallery).toHaveTextContent("Chalupa v létě");
    expect(
      within(gallery).queryByRole("button", {
        name: "Zobrazit: Chalupa v zimě",
      }),
    ).not.toBeInTheDocument();
    await user.click(
      within(gallery).getByRole("button", { name: "Další fotografie" }),
    );
    expect(gallery).toHaveTextContent("Obývací pokoj");
  });
  it("changes pricing by stay length and distributes the total across guests", async () => {
    const user = userEvent.setup();
    render(<Pricing />);
    await user.click(
      screen.getByRole("button", { name: "Víkend", exact: true }),
    );
    const calculator = screen.getByRole("complementary");
    expect(calculator).toHaveTextContent(/14\s000 Kč/);
    fireEvent.change(screen.getByRole("slider"), { target: { value: "14" } });
    expect(calculator).toHaveTextContent(/1\s000 Kč/);
    await user.click(screen.getByRole("button", { name: /Silvestr/ }));
    expect(calculator).toHaveTextContent("Na dotaz");
    expect(calculator).not.toHaveTextContent("za osobu");
  });
  it("filters activities without retaining unrelated results", async () => {
    const user = userEvent.setup();
    render(<Activities />);
    await user.click(screen.getByRole("button", { name: "Zima", exact: true }));
    expect(screen.getByRole("heading", { name: "Lyžování" })).toBeVisible();
    expect(
      screen.queryByRole("heading", { name: "Aquapark Trutnov" }),
    ).not.toBeInTheDocument();
  });
  it("enforces two-night departure and 2–14 guests in the quick enquiry", async () => {
    const user = userEvent.setup();
    render(<BookingBar />);
    fireEvent.change(screen.getByLabelText("Příjezd"), {
      target: { value: "2028-12-31" },
    });
    expect(screen.getByLabelText("Odjezd")).toHaveAttribute(
      "min",
      "2029-01-02",
    );
    fireEvent.change(screen.getByLabelText("Hosté"), {
      target: { value: "14" },
    });
    expect(screen.getByRole("button", { name: "Více hostů" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Méně hostů" }));
    expect(screen.getByLabelText("Hosté")).toHaveValue(13);
  });
  it("prefills the reservation form from the hero without sending an enquiry", async () => {
    window.history.replaceState(
      {},
      "",
      "/rezervace.html?arrival=2028-08-01&departure=2028-08-08&people=12",
    );
    render(<Booking />);
    await waitFor(() =>
      expect(screen.getByLabelText("Počet hostů")).toHaveValue(12),
    );
    expect(screen.getByLabelText("Příjezd")).toHaveValue("2028-08-01");
    expect(screen.getByLabelText("Odjezd")).toHaveValue("2028-08-08");
    expect(screen.getByText("7 nocí")).toBeVisible();
    expect(
      screen
        .getByRole("button", { name: "Odeslat nezávaznou poptávku" })
        .closest("form"),
    ).toHaveAttribute(
      "action",
      "https://formsubmit.co/chataubedynku@seznam.cz",
    );
    window.history.replaceState({}, "", "/");
  });
});
