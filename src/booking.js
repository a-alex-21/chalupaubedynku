export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function addDays(value, count) {
  if (!isDate(value)) return "";
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + count);
  return localDate(date);
}
export function isDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
  const date = new Date(`${value}T12:00:00`);
  return !Number.isNaN(date.getTime()) && localDate(date) === value;
}
export function nightCount(arrival, departure) {
  if (!isDate(arrival) || !isDate(departure)) return 0;
  return Math.round(
    (Date.parse(`${departure}T00:00:00Z`) -
      Date.parse(`${arrival}T00:00:00Z`)) /
      86400000,
  );
}
export function nightLabel(n) {
  return `${n} ${n === 1 ? "noc" : n > 1 && n < 5 ? "noci" : "nocí"}`;
}
export function validGuests(value) {
  const n = Number(value);
  return Number.isInteger(n) && n >= 2 && n <= 14;
}
export function readBookingQuery(search, today = localDate()) {
  const p = new URLSearchParams(search);
  const arrival =
    isDate(p.get("arrival")) && p.get("arrival") >= today
      ? p.get("arrival")
      : "";
  const departure =
    arrival && nightCount(arrival, p.get("departure")) >= 2
      ? p.get("departure")
      : "";
  return {
    arrival,
    departure,
    people: validGuests(p.get("people")) ? Number(p.get("people")) : 8,
  };
}
