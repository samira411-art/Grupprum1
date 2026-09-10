// Typerna för våra två resurser: Room (grupprum) och Booking (bokning)

export interface Room {
  id: string;
  name: string;
  floor: number;
  capacity: number;
  hasWhiteboard: boolean;
  hasScreen: boolean;
}

// Status kan bara vara en av dessa två strängar (union-typ)
export type BookingStatus = "confirmed" | "cancelled";

export interface Booking {
  id: string;
  roomId: string; // vilket rum bokningen gäller (id från Room)
  email: string; // vem som bokat, ingen inloggning
  start: string; // datum+tid, ISO-format
  end: string;
  status: BookingStatus;
}

// När vi skapar en ny bokning har vi inget id än (json-server sätter det)
// och status sätter vi alltid till "confirmed" när vi skickar iväg den.
// Omit tar bort de fälten från Booking istället för att vi skriver ett
// helt nytt interface med samma fält.
export type NewBooking = Omit<Booking, "id" | "status">;
