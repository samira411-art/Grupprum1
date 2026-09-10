import type { BookingStatus } from "../types";

interface Props {
  status: BookingStatus;
}

// Visar status som en liten "pill". Vi kollar vilken av de två möjliga
// strängarna det är (narrowing) för att välja text och färg.
function StatusBadge({ status }: Props) {
  if (status === "confirmed") {
    return <span className="badge badge-confirmed">Bekräftad</span>;
  }

  return <span className="badge badge-cancelled">Avbokad</span>;
}

export default StatusBadge;
