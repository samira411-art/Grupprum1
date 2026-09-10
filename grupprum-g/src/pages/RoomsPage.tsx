import { useEffect, useState } from "react";
import { Link } from "react-router";
import { API_URL } from "../config";
import type { Room } from "../types";

function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/rooms`)
      .then((res) => res.json())
      .then((data: Room[]) => {
        setRooms(data);
        setLoading(false);
      })
      .catch(() => {
        // t.ex. om json-server inte är igång
        setError("Kunde inte hämta rum. Kolla att json-server körs.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Laddar rum...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div>
      <h1>Grupprum</h1>
      <div className="room-list">
        {rooms.map((room) => (
          <Link to={`/rum/${room.id}`} key={room.id} className="room-card">
            <h3>{room.name}</h3>
            <p>Plan {room.floor}</p>
            <p>{room.capacity} platser</p>
            {room.hasWhiteboard && <span className="tag">Whiteboard</span>}
            {room.hasScreen && <span className="tag">Skärm</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RoomsPage;
