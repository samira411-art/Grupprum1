import { useState } from "react";
import type { FormEvent } from "react";
import type { NewBooking } from "../types";

interface Props {
  roomId: string;
  // Callback-prop: föräldern (RoomPage) bestämmer vad som ska hända
  // när formuläret skickas in.
  onBook: (booking: NewBooking) => void;
  errorMessage?: string;
}

function BookingForm({ roomId, onBook, errorMessage }: Props) {
  const [email, setEmail] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // enkel validering innan vi ens skickar iväg något
    if (!start || !end) {
      setError("Du måste fylla i både start- och sluttid.");
      return;
    }

    if (new Date(end).getTime() <= new Date(start).getTime()) {
      setError("Sluttiden måste vara efter starttiden.");
      return;
    }

    if (!email.includes("@")) {
      setError("Ange en giltig e-postadress.");
      return;
    }

    const newBooking: NewBooking = {
      roomId,
      email,
      start,
      end,
    };

    onBook(newBooking);
  }

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <h3>Boka rummet</h3>

      <label>
        E-post
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Start
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </label>

      <label>
        Slut
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </label>

      {error && <p className="error-text">{error}</p>}
      {errorMessage && <p className="error-text">{errorMessage}</p>}

      <button type="submit">Boka</button>
    </form>
  );
}

export default BookingForm;
