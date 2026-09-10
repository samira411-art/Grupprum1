import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_URL } from "../config";
import { hasOverlap } from "../doubleBookingCheck";
import BookingForm from "../components/BookingForm";
import StatusBadge from "../components/StatusBadge";
import type { Booking, NewBooking, Room } from "../types";

function RoomPage() {
  // id kan i teorin vara undefined enligt typen från useParams, så vi
  // måste kolla det innan vi använder det (strict mode kräver det).
  const { id } = useParams<{ id: string }>();

  const [room, setRoom] = useState<Room | undefined>(undefined);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/rooms/${id}`)
      .then((res) => res.json())
      .then((data: Room) => {
        setRoom(data);
        setLoading(false);
      })
      .catch(() => {
        setLoadError("Kunde inte hämta rummet. Kolla att json-server körs.");
        setLoading(false);
      });

    fetch(`${API_URL}/bookings?roomId=${id}`)
      .then((res) => res.json())
      .then((data: Booking[]) => setBookings(data))
      .catch(() => {
        setLoadError("Kunde inte hämta bokningar. Kolla att json-server körs.");
      });
  }, [id]);

  if (!id) {
    return <p>Inget rum valt.</p>;
  }

  if (loading) {
    return <p>Laddar...</p>;
  }

  if (loadError) {
    return <p className="error-text">{loadError}</p>;
  }

  if (!room) {
    return <p>Rummet hittades inte.</p>;
  }

  function handleBook(newBooking: NewBooking) {
    setBookingError("");

    // dubbelbokningskontroll innan vi skickar något till servern
    if (hasOverlap(newBooking.start, newBooking.end, bookings)) {
      setBookingError("Rummet är redan bokat under den tiden.");
      return;
    }

    const bookingToSave: Booking = {
      ...newBooking,
      id: crypto.randomUUID(),
      status: "confirmed",
    };

    fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingToSave),
    })
      .then((res) => res.json())
      .then((saved: Booking) => {
        setBookings([...bookings, saved]);
      })
      .catch(() => {
        setBookingError("Något gick fel, försök igen.");
      });
  }

  return (
    <div>
      <h1>{room.name}</h1>
      <p>
        Plan {room.floor} · {room.capacity} platser
      </p>

      <BookingForm roomId={room.id} onBook={handleBook} errorMessage={bookingError} />

      <h2>Bokade tider</h2>
      {bookings.length === 0 && <p>Inga bokningar än.</p>}
      <ul className="booking-list">
        {bookings.map((booking) => (
          <li key={booking.id} className="booking-item">
            <span>
              {booking.start.replace("T", " ")} - {booking.end.replace("T", " ")}
            </span>
            <span>{booking.email}</span>
            <StatusBadge status={booking.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomPage;
