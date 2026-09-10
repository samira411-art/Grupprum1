import type { Booking } from "./types";

// Kollar om det nya tidsintervallet krockar med någon av de befintliga
// bekräftade bokningarna. Två intervall krockar om det ena börjar innan
// det andra hunnit sluta, och slutar efter att det andra har börjat.
export function hasOverlap(
  newStart: string,
  newEnd: string,
  existingBookings: Booking[],
): boolean {
  const newStartTime = new Date(newStart).getTime();
  const newEndTime = new Date(newEnd).getTime();

  for (const booking of existingBookings) {
    // avbokade bokningar bryr vi oss inte om
    if (booking.status !== "confirmed") {
      continue;
    }

    const existingStart = new Date(booking.start).getTime();
    const existingEnd = new Date(booking.end).getTime();

    if (newStartTime < existingEnd && newEndTime > existingStart) {
      return true;
    }
  }

  return false;
}
