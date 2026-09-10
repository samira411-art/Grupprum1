import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { API_URL } from "../config";
import StatusBadge from "../components/StatusBadge";
import type { Booking, Room } from "../types";

function MyBookingsPage() {
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/bookings`)
      .then((res) => res.json())
      .then((data: Booking[]) => setAllBookings(data))
      .catch(() => setError("Kunde inte hämta bokningar. Kolla att json-server körs."));

    fetch(`${API_URL}/rooms`)
      .then((res) => res.json())
      .then((data: Room[]) => setRooms(data))
      .catch(() => setError("Kunde inte hämta rum. Kolla att json-server körs."));
  }, []);

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearched(true);
  }

  function getRoomName(roomId: string): string {
    const room = rooms.find((r) => r.id === roomId);
    // om vi inte hittar rummet (borde inte hända) visar vi bara id:t
    return room ? room.name : roomId;
  }

  const myBookings = allBookings.filter(
    (b) => b.email.toLowerCase() === email.toLowerCase(),
  );

  return (
    <div>
      <h1>Mina bokningar</h1>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="email"
          placeholder="din@email.se"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Sök</button>
      </form>

      {searched && myBookings.length === 0 && (
        <p>Inga bokningar hittades för den e-posten.</p>
      )}

      <ul className="booking-list">
        {searched &&
          myBookings.map((booking) => (
            <li key={booking.id} className="booking-item">
              <span>{getRoomName(booking.roomId)}</span>
              <span>
                {booking.start.replace("T", " ")} - {booking.end.replace("T", " ")}
              </span>
              <StatusBadge status={booking.status} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MyBookingsPage;
