import { describe, it, expect } from "vitest";
import {
  localDate,
  addDays,
  nightCount,
  nightLabel,
  readBookingQuery,
  isDate,
  validGuests,
} from "./booking";
describe("booking dates and query transfer", () => {
  it("counts nights correctly across DST changes and year boundaries", () => {
    expect(nightCount("2027-03-27", "2027-03-29")).toBe(2);
    expect(nightCount("2027-10-30", "2027-11-01")).toBe(2);
    expect(addDays("2027-12-31", 2)).toBe("2028-01-02");
    expect(nightCount("2027-12-31", "2028-01-02")).toBe(2);
  });
  it("validates real calendar dates and guest capacity", () => {
    expect(isDate("2027-02-29")).toBe(false);
    expect(isDate("2028-02-29")).toBe(true);
    expect(isDate("not-a-date")).toBe(false);
    expect(nightCount("", "")).toBe(0);
    for (const n of [0, 1, 15, 2.5, "bad"]) expect(validGuests(n)).toBe(false);
    expect(validGuests(2)).toBe(true);
    expect(validGuests("14")).toBe(true);
  });
  it("carries valid enquiry inputs while rejecting past dates and short stays", () => {
    expect(
      readBookingQuery(
        "?arrival=2027-08-01&departure=2027-08-08&people=12",
        "2027-01-01",
      ),
    ).toEqual({ arrival: "2027-08-01", departure: "2027-08-08", people: 12 });
    expect(
      readBookingQuery(
        "?arrival=2020-01-01&departure=2020-01-08&people=99",
        "2027-01-01",
      ),
    ).toEqual({ arrival: "", departure: "", people: 8 });
    expect(
      readBookingQuery("?arrival=2027-08-01&departure=2027-08-02", "2027-01-01")
        .departure,
    ).toBe("");
  });
  it("uses Czech night labels", () => {
    expect(nightLabel(2)).toBe("2 noci");
    expect(nightLabel(7)).toBe("7 nocí");
  });
});
