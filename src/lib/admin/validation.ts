import { z } from "zod";

export const slugFor = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
export const positiveOrder = z.coerce.number().int().min(0).max(100000);
export const shortText = z.string().trim().min(1).max(140);
export const optionalText = (limit: number) =>
  z
    .union([z.string().trim().max(limit), z.null()])
    .transform((value) => value || null);
export const checked = (data: FormData, key: string) => data.get(key) === "on";

export function dollarsToCents(value: unknown) {
  if (typeof value !== "string" || !/^\d{1,6}(\.\d{1,2})?$/.test(value))
    throw new Error("Enter a valid dollar amount");
  const [whole, fraction = ""] = value.split(".");
  return Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
}

export function chicagoToUtc(value: string | null) {
  if (!value) return null;
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value))
    throw new Error("Invalid date/time");
  const [date, time] = value.split("T");
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const naiveUtc = Date.UTC(year, month - 1, day, hour, minute);
  if (Number.isNaN(naiveUtc)) throw new Error("Invalid date/time");
  const candidates = [-360, -300].map(
    (offset) => new Date(naiveUtc - offset * 60000),
  );
  const matches = candidates.filter(
    (instant) => chicagoInput(instant.toISOString()) === value,
  );
  if (matches.length !== 1)
    throw new Error("Choose an unambiguous Chicago local time");
  return matches[0].toISOString();
}

export function chicagoInput(value: string | null) {
  if (!value) return "";
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(value));
  const part = (type: string) =>
    parts.find((entry) => entry.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}T${part("hour")}:${part("minute")}`;
}
